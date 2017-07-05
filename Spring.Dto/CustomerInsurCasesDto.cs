using System.Collections.Generic;

namespace Spring.Dto
{
    public class CustomerInsuranceCasesDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int ContractId { get; set; }

        public ICollection<InsuranceCaseItemDto> InsuranceCases { get; set; }
    }
}
