using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Spring.DbContext.Models;
using Spring.Dto.Validations;

namespace Spring.Dto
{
    public class ContractDto : IEntityBase, IValidatableObject
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

        public string Description { get; set; }

        public DateTime BeginDate { get; set; }

        public DateTime EndDate { get; set; }

        public bool IsActive { get; set; }
        #endregion Properties 

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validator = new ContractDtoValidator();
            var result = validator.Validate(this);
            return result.Errors.Select(item => new ValidationResult(item.ErrorMessage, new[] { item.PropertyName }));
        }
    }
}
