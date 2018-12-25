using System;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using MockQueryable;
using Spring.DbContext.Models;

namespace Spring.Dto
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Contract, ContractDto>().ReverseMap();
            CreateMap<Contract, ContractItemDto>().IgnoreAllPropertiesWithAnInaccessibleSetter();

            CreateMap<Customer, CustomerShortDetailsDto>()
                .IgnoreAllPropertiesWithAnInaccessibleSetter();

            CreateMap<Customer, CustomerItemDto>()
                .ForMember(dst => dst.TotalAmount,
                    opt => opt.MapFrom(src => src.InsuranceCases.Sum(ic => ic.TotalAmount)))
                .ForMember(dst => dst.TotalCount, opt => opt.MapFrom(src => src.InsuranceCases.Count))
                .IgnoreAllPropertiesWithAnInaccessibleSetter();

            CreateMap<Customer, CustomerInsuranceCasesDto>()
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
                .ForMember(
                    dst => dst.CustomerName,
                    opt => opt.MapFrom(src => src.Customer.Name)
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
                .ForMember(dst => dst.TotalAmount, opt => opt.Ignore())                
                .IgnoreAllPropertiesWithAnInaccessibleSetter();

            CreateMap<MedicalInsuranceCase, MedicalInsuranceCaseDto>()
                .IncludeBase<InsuranceCase, InsuranceCaseDto>();

            // TODO
            CreateMap<MedicalInsuranceCaseDto, MedicalInsuranceCase>()
                .IncludeBase<InsuranceCaseDto, InsuranceCase>()
                .ForMember(dst => dst.TotalAmount, opt => opt.MapFrom<TotalAmountResolver>());

            CreateMap<Order, OrderDto>().ReverseMap().IgnoreAllPropertiesWithAnInaccessibleSetter();

            CreateMap<ApplicationUser, ApplicationUserDto>()
                .ForMember(dst => dst.Password, opt => opt.Ignore())
                .ForMember(dst => dst.IsAdmin, opt => opt.Ignore())
                .ForMember(dst => dst.IsUser, opt => opt.Ignore())
                .IgnoreAllPropertiesWithAnInaccessibleSetter();
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
