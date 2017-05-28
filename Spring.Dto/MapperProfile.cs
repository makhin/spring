using System;
using System.Linq.Expressions;
using AutoMapper;
using Spring.DbContext.Models;

namespace Spring.Dto
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Contract, ContractDto>().ReverseMap();
            CreateMap<Contract, ContractItemDto>().IgnoreAllPropertiesWithAnInaccessibleSetter();

            // TODO find way to include only dto columns to query
            CreateMap<Customer, CustomerItemDto>()
                .IgnoreAllPropertiesWithAnInaccessibleSetter();

            CreateMap<Customer, CustomerShortDetailsDto>()
                .IgnoreAllPropertiesWithAnInaccessibleSetter();

            CreateMap<Customer, CustomerDto>().ReverseMap();

            CreateMap<Hospital, HospitalDto>().IgnoreAllPropertiesWithAnInaccessibleSetter();
            CreateMap<Mkb10, Mkb10Dto>().ReverseMap().IgnoreAllPropertiesWithAnInaccessibleSetter();

            CreateMap<InsuranceCase, InsuranceCaseItemDto>()
                .ForMember(dst => dst.Mkb10Code,
                    opt => opt.MapFrom(
                        src => src.Mkb10 == null
                            ? null
                            : src.Mkb10.Code.Substring(0, (int)src.Mkb10.Code.IndexOf(" ", StringComparison.Ordinal))))
                .ForMember(dst => dst.HospitalName, opt => opt.MapFrom(src => src.Hospital.Name))
                .IgnoreAllPropertiesWithAnInaccessibleSetter();

            CreateMap<InsuranceCase, InsuranceCaseDto>()
                .ForMember(
                    dst => dst.CaseType,
                    opt => opt.MapFrom(src => src is MedicalInsuranceCase ? 1 : 0)
                )
                .ForMember(
                    dst => dst.HospitalId,
                    opt => opt.MapFrom(MapHospital())
                )
                .ForMember(
                    dst => dst.HospitalDepartmentId,
                    opt => opt.MapFrom(MapHospitalDepartment())
                )
                .IgnoreAllPropertiesWithAnInaccessibleSetter();

            CreateMap<InsuranceCaseDto, InsuranceCase>()
                .ForMember(
                    dst => dst.HospitalId,
                    opt => opt.MapFrom(src => src.HospitalId == null && src.HospitalDepartmentId == null
                        ? null
                        : (src.HospitalDepartmentId != null ? src.HospitalDepartmentId : src.HospitalId))
                )
                .ForMember(dst => dst.Mkb10Id, opt => opt.MapFrom(src => src.Mkb10.Id))
                .ForMember(dst => dst.Hospital, opt => opt.Ignore())
                .ForMember(dst => dst.Customer, opt => opt.Ignore())
                .ForMember(dst => dst.Mkb10, opt => opt.Ignore())
                .IgnoreAllPropertiesWithAnInaccessibleSetter();

            CreateMap<Order, OrderDto>().ReverseMap().IgnoreAllPropertiesWithAnInaccessibleSetter();

            CreateMap<MedicalInsuranceCase, MedicalInsuranceCaseDto>()
                .IncludeBase<InsuranceCase, InsuranceCaseDto>();

            CreateMap<MedicalInsuranceCaseDto, MedicalInsuranceCase>()
                .IncludeBase<InsuranceCaseDto, InsuranceCase>();

        }

        private static Expression<Func<InsuranceCase, int?>> MapHospital()
        {
            return src => src.Hospital == null ? null : (src.Hospital.ParentId != null ? src.Hospital.ParentId : src.Hospital.Id);
        }

        private static Expression<Func<InsuranceCase, int?>> MapHospitalDepartment()
        {
            return src => src.Hospital == null ? null : (src.Hospital.ParentId != null ? src.Hospital.Id : (int?) null);
        }
    }
}
