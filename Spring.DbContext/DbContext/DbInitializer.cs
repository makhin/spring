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
