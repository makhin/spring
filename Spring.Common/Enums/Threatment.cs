using System.ComponentModel.DataAnnotations;
namespace Spring.Common.Enums
{
    public enum Threatment
    {
        [Display(Name = "Поликлиника")] Polyclinic = 1,
        [Display(Name = "Стационар")] Hospital = 2,
        [Display(Name = "Травмпункт")] EmergencyRoom = 3,
        [Display(Name = "Дневной стационар")] DayHospital = 4,
        [Display(Name = "Беременность и Роды")] Pregnancy = 5,
        [Display(Name = "Дополнительные опции")] AdditionalOptions = 6,
        [Display(Name = "Критические заболевания")] CriticalDiseases = 7
    }
}
