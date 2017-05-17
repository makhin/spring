using Spring.DbContext.Models;

namespace Spring.Dto
{
    public class CustomerShortDetailsDto: IEntityBase
    {
        public int Id { get; set; }
        public string Department { get; set; }

        public string PersonnelNumber { get; set; }

        public int DisabilityGroup { get; set; }

        public string MobilePhone { get; set; }

        public string Position { get; set; }
    }
}
