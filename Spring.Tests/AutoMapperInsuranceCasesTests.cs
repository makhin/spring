using System.Collections.Generic;
using AutoMapper;
using Spring.DbContext.Models;
using Spring.Dto;
using Xunit;

namespace Spring.Tests
{
    public class AutoMapperInsuranceCasesTests
    {
        [Fact]
        public void MappingProfile_Configuration()
        {
            Mapper.Reset();
            Mapper.Initialize(m => m.AddProfile<MappingProfile>());
            Mapper.AssertConfigurationIsValid();
        }

        [Fact]
        public void MappingProfile_MedicalInsuranceCase_HospitalIsNull()
        {
            Mapper.Reset();
            Mapper.Initialize(m => m.AddProfile<MappingProfile>());
            Mapper.AssertConfigurationIsValid();

            MedicalInsuranceCase entity = new MedicalInsuranceCase();

            var dto =  Mapper.Map<MedicalInsuranceCase, MedicalInsuranceCaseDto>(entity);
            
            Assert.Null(dto.HospitalId);
            Assert.Null(dto.HospitalDepartmentId);
        }

        [Fact]
        public void MappingProfile_MedicalInsuranceCase_HospitalDepatmentIsNullAndHospitalIsNotNull()
        {
            Mapper.Reset();
            Mapper.Initialize(m => m.AddProfile<MappingProfile>());
            Mapper.AssertConfigurationIsValid();

            const int expectedHospitaId = 1;
            MedicalInsuranceCase entity =
                new MedicalInsuranceCase {Hospital = new Hospital {Id = expectedHospitaId, ParentId = null}};

            var dto = Mapper.Map<MedicalInsuranceCase, MedicalInsuranceCaseDto>(entity);
            Assert.Equal(expectedHospitaId, dto.HospitalId);
            Assert.Null(dto.HospitalDepartmentId);
        }

        [Fact]
        public void MappingProfile_MedicalInsuranceCase_HospitalDepatmentIsNotNullAndHospitalIsNotNull()
        {
            Mapper.Reset();
            Mapper.Initialize(m => m.AddProfile<MappingProfile>());
            Mapper.AssertConfigurationIsValid();

            const int expectedHospitaId = 1;
            const int expectedHospitaDepartmentId = 2;
            MedicalInsuranceCase entity =
                new MedicalInsuranceCase { Hospital = new Hospital { Id = expectedHospitaDepartmentId, ParentId = expectedHospitaId } };

            var dto = Mapper.Map<MedicalInsuranceCase, MedicalInsuranceCaseDto>(entity);
            Assert.Equal(expectedHospitaId, dto.HospitalId);
            Assert.Equal(expectedHospitaDepartmentId, dto.HospitalDepartmentId);
        }

        [Fact]
        public void MappingProfileReverse_MedicalInsuranceCase_HospitalIsNull()
        {
            Mapper.Reset();
            Mapper.Initialize(m => m.AddProfile<MappingProfile>());
            Mapper.AssertConfigurationIsValid();

            MedicalInsuranceCaseDto dto = new MedicalInsuranceCaseDto();

            var entity = Mapper.Map<MedicalInsuranceCaseDto, MedicalInsuranceCase>(dto);
            Assert.Null(entity.HospitalId);
        }

        [Fact]
        public void MappingProfileReverse_MedicalInsuranceCase_HospitalDepatmentIsNullAndHospitalIsNotNull()
        {
            Mapper.Reset();
            Mapper.Initialize(m => m.AddProfile<MappingProfile>());
            Mapper.AssertConfigurationIsValid();

            const int expectedHospitaId = 1;
            MedicalInsuranceCaseDto dto = new MedicalInsuranceCaseDto {HospitalId = expectedHospitaId, HospitalDepartmentId = null};

            var entity = Mapper.Map<MedicalInsuranceCaseDto, MedicalInsuranceCase>(dto);
            Assert.Equal(expectedHospitaId, entity.HospitalId);
        }

        [Fact]
        public void MappingProfileReverse_MedicalInsuranceCase_HospitalDepatmentIsNotNullAndHospitalIsNotNull()
        {
            Mapper.Reset();
            Mapper.Initialize(m => m.AddProfile<MappingProfile>());
            Mapper.AssertConfigurationIsValid();

            const int expectedHospitaId = 1;
            const int expectedHospitaDepartmentId = 2;
            MedicalInsuranceCaseDto dto = new MedicalInsuranceCaseDto { HospitalId = expectedHospitaId, HospitalDepartmentId = expectedHospitaDepartmentId };

            var entity = Mapper.Map<MedicalInsuranceCaseDto, MedicalInsuranceCase>(dto);
            Assert.Equal(expectedHospitaDepartmentId, entity.HospitalId);
        }

        [Theory]
        [InlineData(1, 2, 3, null, 6)]
        [InlineData(null, 2, 3, null, 5)]
        [InlineData(1, null, 3, null, 4)]
        [InlineData(1, null, null, 10, 11)]
        [InlineData(null, null, null, null, null)]
        public void MappingProfile_MedicalInsuranceCase_TotalAmount(int? food, int? diag, int? treat, int? order, int? expected)
        {
            Mapper.Reset();
            Mapper.Initialize(m => m.AddProfile<MappingProfile>());
            Mapper.AssertConfigurationIsValid();

            MedicalInsuranceCaseDto dto = new MedicalInsuranceCaseDto { FoodCosts = food, DiagnosisCosts = diag, Treatment—osts = treat};
            if (order != null)
            {
                dto.Orders = new List<OrderDto> {new OrderDto {Amount = (decimal) order}};
            }

            var entity = Mapper.Map<InsuranceCaseDto, InsuranceCase>(dto);
            Assert.Equal(expected, entity.TotalAmount);
        }
    }
}
