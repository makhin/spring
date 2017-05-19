using System.ComponentModel.DataAnnotations;
namespace Spring.Common.Enums
{
    public enum Therapy
    {
        [Display(Name = "Оперативное")] Surgical,
        [Display(Name = "Консервативное")] Conservative
    }
}
