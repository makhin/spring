using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Spring.DbContext.Models;
using Spring.Dto;
using Spring.Repositories;

namespace Spring.Services
{
    public interface ICustomerService
    {
        Task<PagedResult<CustomerItemDto>> GetByContractId(int contractId, int page, int pageSize, string globalFilter);
    }

    public class CustomerService: ICustomerService
    {
        private readonly IRepository<CustomerItemDto, Customer> _customerItemRepository;

        public CustomerService(IRepository<CustomerItemDto, Customer> customerItemRepository)
        {
            _customerItemRepository = customerItemRepository;
        }

        public async Task<PagedResult<CustomerItemDto>> GetByContractId(int contractId, int page, int pageSize, string globalFilter)
        {
            return await _customerItemRepository.GetPagedResult(
                c => c.ContractId == contractId && (globalFilter == null || c.Name.StartsWith(globalFilter) || c.TIN.StartsWith(globalFilter)), page, pageSize);
        }
    }
}
