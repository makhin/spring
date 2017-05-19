using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Spring.Common.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Threatment:int
    {
        [EnumMember(Value = "Поликлиника")] Polyclinic = 1,
        [EnumMember(Value = "Стационар")] Hospital = 2,
        [EnumMember(Value = "Травмпункт")] EmergencyRoom = 3,
        [EnumMember(Value = "Дневной стационар")] DayHospital = 4,
        [EnumMember(Value = "Беременность и Роды")] Pregnancy = 5,
        [EnumMember(Value = "Дополнительные опции")] AdditionalOptions = 6,
        [EnumMember(Value = "Критические заболевания")] CriticalDiseases = 7
    }
}
