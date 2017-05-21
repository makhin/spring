using FluentValidation;

namespace Spring.Dto.Validations
{
    public class InsuranceCaseDtoValidator : AbstractValidator<InsuranceCaseDto>
    {
        public InsuranceCaseDtoValidator()
        {
            RuleFor(c => c.Mkb10Id).NotNull().WithMessage("Диагноз не может быть пустым");
        }
    }
}
