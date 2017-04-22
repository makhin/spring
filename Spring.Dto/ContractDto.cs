using System;
using Spring.DbContext.Models;

namespace Spring.Dto
{
    public class ContractDto : IEntityBase
    {
        #region Constructor 
        public ContractDto()
        {

        }
        #endregion Constructor 

        #region Properties 
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public DateTime BeginDate { get; set; }
        #endregion Properties 
    }
}
