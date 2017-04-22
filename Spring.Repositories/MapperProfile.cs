using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using AutoMapper.Configuration;
using Spring.DbContext.Models;
using Spring.Dto;

namespace Spring.Repositories
{
    public class MappingProfile : Profile
    {        
        public MappingProfile()
        {
            // Add as many of these lines as you need to map your objects
            CreateMap<Contract, ContractDto>();
           
        }
    }
}
