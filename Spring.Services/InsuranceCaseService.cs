using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Spring.DbContext.Models;
using Spring.Dto;
using Spring.Repositories;

namespace Spring.Services
{
    public interface IInsuranceCaseService
    {
        Task<IEnumerable<InsuranceCaseItemDto>> GetAllByCustomerId(int id);
    }

    public class InsuranceCaseService : IInsuranceCaseService
    {
        private readonly IRepository<InsuranceCase> _insuranceCaseRepository;
        private readonly IMapper _mapper;

        public InsuranceCaseService(IRepository<InsuranceCase> insuranceCaseRepository, IMapper mapper)
        {
            _insuranceCaseRepository = insuranceCaseRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<InsuranceCaseItemDto>> GetAllByCustomerId(int id)
        {
            return await _insuranceCaseRepository.GetAll()
                .Where(c => c.CustomerId == id)
                .ProjectTo<InsuranceCaseItemDto>()
                .ToListAsync();
        }
    }
}
