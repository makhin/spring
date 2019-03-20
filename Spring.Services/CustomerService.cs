using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Spring.DbContext.Models;
using Spring.Dto;
using Spring.Repositories;
using Spring.Repositories.Extensions;

namespace Spring.Services
{
    public interface ICustomerService
    {
        Task<PagedResult<CustomerItemDto>> GetByContractId(int contractId, int page, int pageSize, string globalFilter);

        Task<CustomerShortDetailsDto> GetShortDetails(int clientId);

        Task<CustomerInsuranceCasesDto> GetInsuranceCasesByCustomerId(int id);

        Task<CustomerDto> Get(int id);

        Task<CustomerDto> Update(CustomerDto dto);

        Task<CustomerDto> Insert(CustomerDto dto);

        Task<int> Delete(int id);

        Task<IList<string>> GetDepartmentsByContract(int id, string s);
    }

    public class CustomerService: ICustomerService
    {
        private readonly IRepository<Customer> _customerRepository;
        private readonly IMapper _mapper;

        public CustomerService(IRepository<Customer> customerRepository, IMapper mapper)
        {
            _customerRepository = customerRepository;
            _mapper = mapper;
        }

        public async Task<PagedResult<CustomerItemDto>> GetByContractId(int contractId, int page, int pageSize, string globalFilter)
        {
            var customers = _customerRepository.GetAll()
                .Where(c => c.ContractId == contractId && (globalFilter == null || c.Name.StartsWith(globalFilter) ||
                                                           c.TIN.StartsWith(globalFilter)))
                .OrderBy(c => c.Name);

            var totalNumberOfRecords = await customers.CountAsync();
            var projection = await (from customer in customers.GetByPage(page, pageSize)
                                    select new CustomerItemDto
                                    {
                                        Id = customer.Id,
                                        Name = customer.Name,
                                        TIN = customer.TIN,
                                        StartDate = customer.StartDate,
                                        EndDate = customer.EndDate,
                                        TotalAmount = customer.InsuranceCases.Sum(g => g.TotalAmount),
                                        TotalCount = customer.InsuranceCases.Count
                                    }).ToListAsync();

            var mod = totalNumberOfRecords % pageSize;
            var totalPageCount = totalNumberOfRecords / pageSize + (mod == 0 ? 0 : 1);

            return new PagedResult<CustomerItemDto>
            {
                Items = projection,
                PageNumber = page,
                PageSize = projection.Count,
                TotalNumberOfPages = totalPageCount,
                TotalNumberOfRecords = totalNumberOfRecords
            };
        }

        public async Task<CustomerInsuranceCasesDto> GetInsuranceCasesByCustomerId(int id)
        {
            var customer = await _customerRepository.Get(id, customers =>
            {
                customers = customers
                    .Include(cs => cs.InsuranceCases).ThenInclude(ic => ic.Hospital)
                    .Include(cs => cs.InsuranceCases).ThenInclude(ic => ic.Mkb10);
                return customers;
            });
            return _mapper.Map<Customer, CustomerInsuranceCasesDto>(customer);
        }

        public async Task<CustomerShortDetailsDto> GetShortDetails(int clientId)
        {
            var customer = await _customerRepository.Get(clientId, customers => customers);
            return _mapper.Map<Customer, CustomerShortDetailsDto>(customer);
        }

        public async Task<CustomerDto> Get(int id)
        {
            var contract = await _customerRepository.Get(id, customers => customers);
            return _mapper.Map<Customer, CustomerDto>(contract);
        }

        public async Task<CustomerDto> Update(CustomerDto dto)
        {
            var contract = _mapper.Map<CustomerDto, Customer>(dto);
            await _customerRepository.Update(contract);
            return dto;
        }

        public async Task<CustomerDto> Insert(CustomerDto dto)
        {
            var contract = _mapper.Map<CustomerDto, Customer>(dto);
            var newContract = await _customerRepository.Insert(contract);
            return _mapper.Map<Customer, CustomerDto>(newContract);
        }

        public async Task<int> Delete(int id)
        {
            return await _customerRepository.Delete(id);
        }

        public async Task<IList<string>> GetDepartmentsByContract(int id, string s)
        {
            return await _customerRepository.GetByCondition(c => c.ContractId == id && s != null && c.Department.Contains(s))
                .Select(c => c.Department)
                .Distinct()
                .OrderBy(c => c).ToListAsync();
        }
    }
}
