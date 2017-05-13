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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
