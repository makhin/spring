using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Spring.DbContext.Models;
using Spring.Dto.Validations;

namespace Spring.Dto
{
    public class CustomerInsuranceCasesDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<InsuranceCaseItemDto> InsuranceCases { get; set; }
    }
}
