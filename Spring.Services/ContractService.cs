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
        Task<IEnumerable<ContractDto>> GetAll();

        Task<ContractDto> Get(int id);

        Task<ContractDto> Update(ContractDto dto);

        Task<ContractDto> Insert(ContractDto dto);

        Task<int> Delete(int id);
    }

    public class ContractService : IContractService
    {
        private readonly IRepository<ContractDto, Contract> _repository;

        public ContractService(IRepository<ContractDto, Contract> repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<ContractDto>> GetAll()
        {
            return await _repository.GetAll();
        }

        public async Task<ContractDto> Get(int id)
        {
            return await _repository.Get(id);
        }

        public async Task<ContractDto> Update(ContractDto dto)
        {
            return await _repository.Update(dto);
        }

        public async Task<ContractDto> Insert(ContractDto dto)
        {
            return await _repository.Insert(dto);
        }

        public async Task<int> Delete(int id)
        {
            return await _repository.Delete(id);
        }
    }
}
