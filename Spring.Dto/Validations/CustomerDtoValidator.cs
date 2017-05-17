using System;
using System.Collections.Generic;
using System.Text;
using FluentValidation;

namespace Spring.Dto.Validations
{
    public class CustomerDtoValidator : AbstractValidator<CustomerDto>
    {
        public CustomerDtoValidator()
        {
            RuleFor(c => c.Name).NotNull().NotEmpty().WithMessage("ФИО не может быть пустым");
            RuleFor(c => c.ContractId).NotNull().NotEmpty().WithMessage("Контракт не может быть пустым");
            RuleFor(c => c.TIN).Matches(@"^\d{10}$").WithMessage("ИНН должен содержать 10 цифр");
            RuleFor(c => c.StartDate).NotNull().NotEmpty().WithMessage("Дата начала не может быть пустой");
            When(c => c.DisabilityGroup.HasValue, () =>
            {
                RuleFor(c => c.DisabilityGroup)
                    .Must(c => c.Value >= 1 && c.Value <= 3)
                    .WithMessage("Группа инвалиднисти от 1 до 3");
            });
            RuleFor(c=>c.CardNumber).CreditCard().WithMessage("Номер карты неправильный");
        }
    }
}
