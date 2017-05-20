using Spring.DbContext.Models;

namespace Spring.Dto
{
    public class HospitalDto: IEntityBase
    {
        public int Id { get; set; }

        public int? ParentId { get; set; }

        public string Name { get; set; }
    }
}
