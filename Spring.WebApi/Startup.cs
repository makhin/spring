using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Linq;
using System.Reflection;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Spring.DbContext.DbContext;
using Spring.DbContext.Models;
using Spring.Repositories;
using Spring.Services;
using Spring.WebApi.Filters;
using Serilog;

namespace Spring.WebApi
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddAutoMapper();

            string connectionString = Configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<SpringDbContext>(options =>
            {
                options.UseSqlServer(connectionString,
                    builder => builder.MigrationsAssembly(typeof(SpringDbContext).GetTypeInfo()
                        .Assembly.GetName()
                        .Name));
            });

            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddTransient<IContractService, ContractService>();
            services.AddTransient<ICustomerService, CustomerService>();
            services.AddTransient<IInsuranceCaseService, InsuranceCaseService>();
            services.AddTransient<ILookupService, LookupService>();
            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
            services.AddTransient<IUserService, UserService>();            
            
            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
                {
                    options.Password.RequireDigit = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequiredLength = 6;
                })
                .AddEntityFrameworkStores<SpringDbContext>()
                .AddDefaultTokenProviders();
            
            services.AddApplicationInsightsTelemetry(Configuration);

            services.AddMvc(
                config =>
                {
                    config.Filters.Add(typeof(SpringExceptionFilter));
                }
            ).AddJsonOptions(opts =>
            {
                // Force Camel Case to JSON
                opts.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                opts.SerializerSettings.Converters.Add(new StringEnumConverter {CamelCaseText = true});
            });
            
            services.AddAuthorization(options =>
            {
                options.AddPolicy("Manage Accounts", policy => policy.RequireRole("admin"));
                options.AddPolicy("Access Resources", policy => policy.RequireRole("admin", "user"));
            });

            services.AddTransient<IEmailSender, AuthMessageSender>();
            services.AddTransient<ISmsSender, AuthMessageSender>();
            
            services.AddIdentityServer(options =>
                {
                    options.IssuerUri = Configuration["IssuerUri"];
                })
                .AddDeveloperSigningCredential()
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApiResources())
                .AddInMemoryClients(Config.GetClients())
                .AddAspNetIdentity<ApplicationUser>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(o =>
            {
                o.Authority = Configuration["Authority"];
                o.Audience = "WebAPI";
                o.RequireHttpsMetadata = false;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            var serilog = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .Enrich.FromLogContext();

            serilog
                .WriteTo.File(
                    outputTemplate:
                    "[{Timestamp:HH:mm:ss} {Level}] {SourceContext}{NewLine}{Message}{NewLine}{Exception}{NewLine}",
                    path: @"identityserver4_log.txt");

            loggerFactory
                .AddSerilog(serilog.CreateLogger());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            var appRoutes = new[] {
                "/api/",
                "/connect/"
            };

            app.Use(async (context, next) =>
            {
                await next();

                if (context.Response.StatusCode == 404 &&
                    !Path.HasExtension(context.Request.Path.Value) &&
                    !appRoutes.Contains(context.Request.Path.Value))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
