using System.Linq;

namespace Spring.Repositories.Extensions
{
    public static class EntityExtensions
    {
        public static IQueryable<T> GetByPage<T>(this IQueryable<T> entities,  int page, int pageSize)
        {
            var skipAmount = pageSize * (page - 1);

            return entities
                .Skip(skipAmount)
                .Take(pageSize);
        }
    }
}
