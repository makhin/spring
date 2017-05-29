using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;

namespace Spring.Dto.Validations
{
    public class OrderDtoValidator : AbstractValidator<OrderDto>
    {
        public OrderDtoValidator()
        {
            RuleFor(c => c.Amount).NotEqual(0).WithMessage("Сумма не должна быть равно нулю");
        }
    }
}
