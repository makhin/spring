using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Spring.DbContext.Models;
using Spring.Dto.Validations;

namespace Spring.Dto
{
    public class OrderDto: IEntityBase, IValidatableObject
    {
        public int Id { get; set; }

        public DateTime? RecipeDate { get; set; }

        public DateTime? OrderDate { get; set; }

        public string RecipeNumber { get; set; }

        public string OrderNumber { get; set; }

        public string Pharmacy { get; set; }

        public decimal Amount { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validator = new OrderDtoValidator();
            var result = validator.Validate(this);
            return result.Errors.Select(item => new ValidationResult(item.ErrorMessage, new[] { item.PropertyName }));
        }
    }
}
