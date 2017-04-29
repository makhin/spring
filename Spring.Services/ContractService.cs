using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
        private readonly IRepository<ContractDto, Contract> _contractRepository;
        private readonly IRepository<ContractItemDto, Contract> _contractItemRepository;

        public ContractService(IRepository<ContractDto, Contract> contractRepository, IRepository<ContractItemDto, Contract> contractItemRepository)
        {
            _contractRepository = contractRepository;
            _contractItemRepository = contractItemRepository;
        }

        public async Task<IEnumerable<ContractItemDto>> GetAll()
        {
            return await _contractItemRepository.GetAll();
        }

        public async Task<ContractDto> Get(int id)
        {
            return await _contractRepository.Get(id);
        }

        public async Task<ContractDto> Update(ContractDto dto)
        {
            return await _contractRepository.Update(dto);
        }

        public async Task<ContractDto> Insert(ContractDto dto)
        {
            return await _contractRepository.Insert(dto);
        }

        public async Task<int> Delete(int id)
        {
            return await _contractRepository.Delete(id);
        }
    }
}
