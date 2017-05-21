using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Spring.DbContext.Models
{
    public class Mkb10: IEntityBase
    {
        [Key]
        public int Id { get; set; }

        [ForeignKey("Mkb10")]
        public int? ParentId { get; set; }

        public virtual Mkb10 Parent { get; set; }

        public string Code { get; set; }
    }
}
