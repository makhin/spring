using System.Linq;
using Spring.DbContext.Models;

namespace Spring.DbContext.DbContext
{
    public static class DbInitializer
    {
        public static void Initialize(SpringDbContext context)
        {
            context.Database.EnsureCreated();

            // Look for any test data.
            if (context.TestData.Any())
            {
                return;   // DB has been seeded
            }

            var testData = new TestData
            {
                Username = "JaneDoe",
                EmailAddress = "jane.doe@example.com",
                Password = "LetM@In!",
                Currency = 321.45M
            };

            context.TestData.Add(testData);
            context.SaveChanges();
        }
    }
}
