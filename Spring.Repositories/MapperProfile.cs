using AutoMapper;
using Spring.DbContext.Models;
using Spring.Dto;

namespace Spring.Repositories
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

            CreateMap<InsuranceCase, InsuranceCaseItemDto>()
                .ForMember(dst=>dst.Mkb10Code, opt=>opt.MapFrom(src=>src.Mkb10.Code))
                .ForMember(dst => dst.HospitalName, opt => opt.MapFrom(src => src.Hospital.Name))
                .IgnoreAllPropertiesWithAnInaccessibleSetter();            
        }
    }
}
