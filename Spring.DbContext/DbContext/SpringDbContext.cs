using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Spring.DbContext.Models;

namespace Spring.DbContext.DbContext
{
    public class SpringDbContext : IdentityDbContext<ApplicationUser>
    {
        public SpringDbContext(DbContextOptions<SpringDbContext> options) : base(options)
        {
        }
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<InsuranceCase> InsuranceCases { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Mkb10> Mkb10s { get; set; }
        public DbSet<Hospital> Hospitals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<InsuranceCase>()
                .HasDiscriminator<int>("CaseType")
                .HasValue<MedicalInsuranceCase>(1);

            modelBuilder.Entity<Contract>()
                .Property(e => e.BeginDate)
                .HasColumnType("date");
            modelBuilder.Entity<Contract>()
                .Property(e => e.EndDate)
                .HasColumnType("date");

            modelBuilder.Entity<Customer>()
                .Property(e => e.DateOfBirth)
                .HasColumnType("date");
            modelBuilder.Entity<Customer>()
                .Property(e => e.StartDate)
                .HasColumnType("date");
            modelBuilder.Entity<Customer>()
                .Property(e => e.EndDate)
                .HasColumnType("date");

            modelBuilder.Entity<InsuranceCase>()
                .Property(e => e.BeginDate)
                .HasColumnType("date");
            modelBuilder.Entity<InsuranceCase>()
                .Property(e => e.EndDate)
                .HasColumnType("date");

            modelBuilder.Entity<MedicalInsuranceCase>()
                .Property(e => e.ReportDate)
                .HasColumnType("date");
            modelBuilder.Entity<MedicalInsuranceCase>()
                .Property(e => e.DocumentDate)
                .HasColumnType("date");

            modelBuilder.Entity<Order>()
                .Property(e => e.OrderDate)
                .HasColumnType("date");
            modelBuilder.Entity<Order>()
                .Property(e => e.RecipeDate)
                .HasColumnType("date");
            modelBuilder.Entity<Order>()
                .Property(e => e.Amount)
                .HasColumnType("Money");

            base.OnModelCreating(modelBuilder);
        }
    }
}
