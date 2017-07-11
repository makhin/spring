using FluentValidation;

namespace Spring.Dto.Validations
{
    public class ApplicationUserDtoValidator : AbstractValidator<ApplicationUserDto>
    {
        public ApplicationUserDtoValidator()
        {
            RuleFor(c => c.LastName).NotNull().NotEmpty().WithMessage("Фамилия не может быть пустой");
            RuleFor(c => c.FirstName).NotNull().NotEmpty().WithMessage("Имя не может быть пустым");
            RuleFor(c => c.Email).NotNull().NotEmpty().EmailAddress().WithMessage("Почтовый адрес пустой или неверный");
            RuleFor(c => c.Password).NotNull().NotEmpty().WithMessage("Пароль не может быть пустым");
        }
    }
}
