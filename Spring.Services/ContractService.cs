using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Spring.DbContext.Models;
using Spring.Dto;
using Spring.Repositories;

namespace Spring.Services
{
    public interface IContractService
    {
        Task<IEnumerable<ContractItemDto>> GetAll();

        Task<ContractDto> Get(int id);

        Task<ContractDto> Update(ContractDto dto);

        Task<ContractDto> Insert(ContractDto dto);

        Task<int> Delete(int id);
    }

    public class ContractService : IContractService
    {
        private readonly IRepository<Contract> _contractRepository;
        private readonly IMapper _mapper;

        public ContractService(IRepository<Contract> contractRepository, IMapper mapper)
        {
            _contractRepository = contractRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ContractItemDto>> GetAll()
        {
            return await _contractRepository.GetAll().ProjectTo<ContractItemDto>().ToListAsync();
        }

        public async Task<ContractDto> Get(int id)
        {
            var contract = await _contractRepository.Get(id);
            return _mapper.Map<Contract, ContractDto>(contract);
        }

        public async Task<ContractDto> Update(ContractDto dto)
        {
            var contract = _mapper.Map<ContractDto, Contract>(dto);
            await _contractRepository.Update(contract);
            return dto;
        }

        public async Task<ContractDto> Insert(ContractDto dto)
        {
            var contract = _mapper.Map<ContractDto, Contract>(dto);
            var newContract = await _contractRepository.Insert(contract);             
            return _mapper.Map<Contract, ContractDto>(newContract);
        }

        public async Task<int> Delete(int id)
        {
            return await _contractRepository.Delete(id);
        }
    }
}
