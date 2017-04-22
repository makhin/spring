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

        public DbSet<TestData> TestData { get; set; }
        public DbSet<Contract> Contracts { get; set; }
        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TestData>().ToTable("TestData");
            base.OnModelCreating(modelBuilder);
        }
    }
}
