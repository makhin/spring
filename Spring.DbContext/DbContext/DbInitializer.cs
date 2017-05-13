using System.Linq;
using Spring.DbContext.Models;

namespace Spring.DbContext.DbContext
{
    public static class DbInitializer
    {
        public static void Initialize(SpringDbContext context)
        {
            context.Database.EnsureCreated();
        }
    }
}
