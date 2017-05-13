using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Spring.DbContext.Models;
using Spring.Dto;
using Spring.Repositories;

namespace Spring.Services
{
    public interface ICustomerService
    {
        Task<IEnumerable<CustomerItemDto>> GetByContractId(int contractId);
    }

    public class CustomerService: ICustomerService
    {
        private readonly IRepository<CustomerItemDto, Customer> _customerItemRepository;

        public CustomerService(IRepository<CustomerItemDto, Customer> customerItemRepository)
        {
            _customerItemRepository = customerItemRepository;
        }

        public async Task<IEnumerable<CustomerItemDto>> GetByContractId(int contractId)
        {
            return await _customerItemRepository.AllByCondition(c => c.ContractId == contractId && c.Id < 10);
        }
    }
}
