using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using Spring.DbContext.Models;
using Spring.Dto;
using Xunit;

namespace Spring.Tests
{
    public class AutoMapperCustomerTests
    {
        [Fact]
        public void MappingProfile_Configuration()
        {
            Mapper.Reset();
            Mapper.Initialize(m => m.AddProfile<MappingProfile>());
            Mapper.AssertConfigurationIsValid();
        }

        [Fact]
        public void MappingProfile_CustomerToCustomerItemDto()
        {
            Mapper.Reset();
            Mapper.Initialize(m => m.AddProfile<MappingProfile>());
            Mapper.AssertConfigurationIsValid();

            Customer entity = new Customer()
            {
                InsuranceCases = new List<InsuranceCase>() {new MedicalInsuranceCase() { TotalAmount = 100 }, new MedicalInsuranceCase() { TotalAmount = null } }
            };

            var dto = Mapper.Map<Customer, CustomerItemDto>(entity);
            Assert.Equal(100, dto.TotalAmount);
            Assert.Equal(2, dto.TotalCount);
        }
    }
}
