using AutoMapper;
using Spring.DbContext.Models;
using Spring.Dto;
using Xunit;

namespace Spring.Tests
{
    public class AutoMapperTests
    {
        [Fact]
        public void MappingProfile_Configuration()
        {
            Mapper.Initialize(m => m.AddProfile<MappingProfile>());
            Mapper.AssertConfigurationIsValid();
        }

        [Fact]
        public void MappingProfile_MedicalInsuranceCase_HospitalIsNull()
        {
            Mapper.Initialize(m => m.AddProfile<MappingProfile>());
            Mapper.AssertConfigurationIsValid();

            MedicalInsuranceCase entity = new MedicalInsuranceCase();

            var dto =  Mapper.Map<MedicalInsuranceCase, MedicalInsuranceCaseDto>(entity);
            Assert.Equal(null, dto.HospitalId);
            Assert.Equal(null, dto.HospitalDepartmentId);
        }

        [Fact]
        public void MappingProfile_MedicalInsuranceCase_HospitalDepatmentIsNullAndHospitalIsNotNull()
        {
            Mapper.Initialize(m => m.AddProfile<MappingProfile>());
            Mapper.AssertConfigurationIsValid();

            const int expectedHospitaId = 1;
            MedicalInsuranceCase entity =
                new MedicalInsuranceCase {Hospital = new Hospital {Id = expectedHospitaId, ParentId = null}};

            var dto = Mapper.Map<MedicalInsuranceCase, MedicalInsuranceCaseDto>(entity);
            Assert.Equal(expectedHospitaId, dto.HospitalId);
            Assert.Equal(null, dto.HospitalDepartmentId);
        }

        [Fact]
        public void MappingProfile_MedicalInsuranceCase_HospitalDepatmentIsNotNullAndHospitalIsNotNull()
        {
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
            Mapper.Initialize(m => m.AddProfile<MappingProfile>());
            Mapper.AssertConfigurationIsValid();

            MedicalInsuranceCaseDto dto = new MedicalInsuranceCaseDto();

            var entity = Mapper.Map<MedicalInsuranceCaseDto, MedicalInsuranceCase>(dto);
            Assert.Equal(null, entity.HospitalId);
        }

        [Fact]
        public void MappingProfileReverse_MedicalInsuranceCase_HospitalDepatmentIsNullAndHospitalIsNotNull()
        {
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
            Mapper.Initialize(m => m.AddProfile<MappingProfile>());
            Mapper.AssertConfigurationIsValid();

            const int expectedHospitaId = 1;
            const int expectedHospitaDepartmentId = 2;
            MedicalInsuranceCaseDto dto = new MedicalInsuranceCaseDto { HospitalId = expectedHospitaId, HospitalDepartmentId = expectedHospitaDepartmentId };

            var entity = Mapper.Map<MedicalInsuranceCaseDto, MedicalInsuranceCase>(dto);
            Assert.Equal(expectedHospitaDepartmentId, entity.HospitalId);
        }
    }
}
