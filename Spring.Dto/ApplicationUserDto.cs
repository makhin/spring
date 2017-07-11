using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Spring.Dto.Validations;

namespace Spring.Dto
{
    public class ApplicationUserDto: IValidatableObject
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsUser { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validator = new ApplicationUserDtoValidator();
            var result = validator.Validate(this);
            return result.Errors.Select(item => new ValidationResult(item.ErrorMessage, new[] { item.PropertyName }));
        }
    }
}
