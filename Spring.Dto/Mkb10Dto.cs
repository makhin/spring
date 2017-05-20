using Spring.DbContext.Models;

namespace Spring.Dto
{
    public class Mkb10Dto: IEntityBase
    {
        public int Id { get; set; }

        public int? ParentId { get; set; }

        public string Code { get; set; }
    }
}
