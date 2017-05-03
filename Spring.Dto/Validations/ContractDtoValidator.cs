using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;

namespace Spring.Dto.Validations
{
    public class ContractDtoValidator : AbstractValidator<ContractDto>
    {
        public ContractDtoValidator()
        {
            RuleFor(c => c.Name).NotEmpty().WithMessage("Имя не может быть пустым");
        }
    }
}
