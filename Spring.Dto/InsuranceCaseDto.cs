﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Spring.Common.Enums;
using Spring.DbContext.Models;
using Spring.Dto.Validations;

namespace Spring.Dto
{
    public abstract class InsuranceCaseDto : IEntityBase, IValidatableObject
    {
        public int Id { get; set; }

        public int CustomerId { get; set; }

        public int CaseType { get; set; }

        public int? Mkb10Id { get; set; }

        public Threatment? Threatment { get; set; }

        public Therapy? Therapy { get; set; }

        public int? HospitalId { get; set; }

        public DateTime? BeginDate { get; set; }

        public DateTime? EndDate { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var validator = new InsuranceCaseDtoValidator();
            var result = validator.Validate(this);
            return result.Errors.Select(item => new ValidationResult(item.ErrorMessage, new[] { item.PropertyName }));
        }
    }
}
