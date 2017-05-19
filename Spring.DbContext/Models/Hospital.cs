using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Spring.DbContext.Models
{
    public class Hospital: IEntityBase
    {
        public int Id { get; set; }

        [ForeignKey("Hospital")]
        public int ParentId { get; set; }

        public virtual Hospital Parent { get; set; }

        public string Name { get; set; }
    }
}
