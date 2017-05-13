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
            RuleFor(c => c.Name).NotNull().NotEmpty().WithMessage("Имя не может быть пустым");
            RuleFor(c => c.Code).NotNull().NotEmpty().WithMessage("Код не может быть пустым");
            RuleFor(c => c.Code).Length(3, 10).WithMessage("Код должен содержать от 3 до 10 знаков");
            RuleFor(c => c.BeginDate).LessThanOrEqualTo(c => c.EndDate).WithMessage("Дата окончания должна быть больше или равна дате начала");
        }
    }
}
