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
        public DbSet<Mkb10> Mkb10s { get; set; }
        public DbSet<Hospital> Hospitals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MedicalInsuranceCase>();
            base.OnModelCreating(modelBuilder);
        }
    }
}
