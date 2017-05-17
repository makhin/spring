using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Spring.DbContext.Models;
using Spring.Dto.Validations;

namespace Spring.Dto
{
    public class CustomerDto: IEntityBase, IValidatableObject
    {
        public int Id { get; set; }

        public int ContractId { get; set; }

        public string Name { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string TIN { get; set; }

        public string Department { get; set; }

        public string PersonnelNumber { get; set; }

        public int? DisabilityGroup { get; set; }

        public string MobilePhone { get; set; }

        public string Position { get; set; }

        public string AdditionalInfo { get; set; }

        public string CardNumber { get; set; }

        public string Address { get; set; }

        public bool? Sex { get; set; }

        public string Passport { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validator = new CustomerDtoValidator();
            var result = validator.Validate(this);
            return result.Errors.Select(item => new ValidationResult(item.ErrorMessage, new[] { item.PropertyName }));
        }
    }
}
