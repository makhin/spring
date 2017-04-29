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
        }
    }
}
