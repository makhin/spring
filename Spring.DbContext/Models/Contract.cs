using System;

namespace Spring.DbContext.Models
{
    public class Contract : IEntityBase
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public DateTime BeginDate { get; set; }
    }
}
