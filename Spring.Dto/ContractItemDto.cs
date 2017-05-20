using Spring.DbContext.Models;

namespace Spring.Dto
{
    public class ContractItemDto : IEntityBase
    {
        #region Properties 
        public int Id { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; }
        #endregion Properties 
    }
}
