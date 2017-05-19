using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace Spring.Common.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum Therapy
    {
        [EnumMember(Value = "Оперативное")] Surgical,
        [EnumMember(Value = "Консервативное")] Conservative
    }
}
