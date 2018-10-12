using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AutoMapper;
using FizzWare.NBuilder;
using FluentAssertions;
using MockQueryable.Moq;
using Moq;
using Spring.DbContext.Models;
using Spring.Dto;
using Spring.Repositories;
using Spring.Services;
using Xunit;

namespace Spring.Tests
{
    public class CustomerServiceTests
    {
        private readonly Mock<IRepository<Customer>> repositoryMock = new Mock<IRepository<Customer>>();
        private readonly Mock<IMapper> mapperMock = new Mock<IMapper>();
        private readonly CustomerService subject;

        public CustomerServiceTests()
        {
            subject = new CustomerService(repositoryMock.Object, mapperMock.Object);
        }

        [Fact]
        public void GetByContractId_CallRepositoryGetAll()
        {
            var result = subject.GetByContractId(1, 1, 10, null);
            repositoryMock.Verify(r => r.GetAll(), Times.Once);
        }

        [Fact]
        public async void GetByContractId_FilterById()
        {
            Contract contract = Builder<Contract>.CreateNew().Build();
            var expected = 5;
            var id = 1;

            var customers = Builder<Customer>
                .CreateListOfSize(10)
                .All()
                .With(c => c.Contract = contract)
                .With(c => c.InsuranceCases = new List<InsuranceCase>())
                .TheFirst(expected).With(c => c.ContractId = id)
                .Build()
                .AsQueryable().BuildMock();

            repositoryMock.Setup(r => r.GetAll()).Returns(customers.Object);
            var result = await subject.GetByContractId(id, 1, 10, string.Empty);
            result.Items.Should().HaveCount(expected);
            result.TotalNumberOfRecords.Should().Be(expected);
            result.Items.Should().BeInAscendingOrder(c => c.Name);
        }

        [Theory]
        [InlineData(111, 10, 12)]
        [InlineData(100, 1, 100)]
        [InlineData(55, 5, 11)]
        public async void GetByContractId_PagesCount(int count, int pageSize, int expected)
        {
            Contract contract = Builder<Contract>.CreateNew().Build();
            var id = 1;

            var customers = Builder<Customer>
                .CreateListOfSize(count)
                .All()
                .With(c => c.Contract = contract)
                .With(c => c.InsuranceCases = new List<InsuranceCase>())
                .With(c => c.ContractId = id)
                .Build()
                .AsQueryable().BuildMock();

            repositoryMock.Setup(r => r.GetAll()).Returns(customers.Object);
            var result = await subject.GetByContractId(id, 1, pageSize, string.Empty);
            result.TotalNumberOfPages.Should().Be(expected);
        }

        [Fact]
        public async void GetByContractId_FilterByName()
        {
            Contract contract = Builder<Contract>.CreateNew().Build();
            var expected = 5;
            var id = 1;

            var customers = Builder<Customer>
                .CreateListOfSize(10)
                .All()
                .With(c => c.Contract = contract)
                .With(c => c.InsuranceCases = new List<InsuranceCase>())
                .With(c => c.ContractId = id)
                .TheFirst(expected).With(c => c.Name = "AAA")
                .Build()
                .AsQueryable().BuildMock();

            repositoryMock.Setup(r => r.GetAll()).Returns(customers.Object);
            var result = await subject.GetByContractId(id, 1, 10, "AA");
            result.Items.Should().HaveCount(expected);
            result.TotalNumberOfRecords.Should().Be(expected);
        }

        [Fact]
        public async void GetByContractId_FilterByTIN()
        {
            Contract contract = Builder<Contract>.CreateNew().Build();
            var expected = 5;
            var id = 1;

            var customers = Builder<Customer>
                .CreateListOfSize(10)
                .All()
                .With(c => c.Contract = contract)
                .With(c => c.InsuranceCases = new List<InsuranceCase>())
                .With(c => c.ContractId = id)
                .TheFirst(expected).With(c => c.TIN = "111")
                .Build()
                .AsQueryable().BuildMock();

            repositoryMock.Setup(r => r.GetAll()).Returns(customers.Object);
            var result = await subject.GetByContractId(id, 1, 10, "11");
            result.Items.Should().HaveCount(expected);
            result.TotalNumberOfRecords.Should().Be(expected);
        }

        [Fact]
        public async void GetByContractId_CasesSumAndCount()
        {
            Contract contract = Builder<Contract>.CreateNew().Build();
            var cases = Builder<MedicalInsuranceCase>.CreateListOfSize(5).All().With(i => i.TotalAmount = 5.5m).Build().Cast<InsuranceCase>().ToList();
            var id = 1;

            var customers = Builder<Customer>
                .CreateListOfSize(1)
                .All()
                .With(c => c.Contract = contract)
                .With(c => c.InsuranceCases = cases)
                .With(c => c.ContractId = id)
                .Build()
                .AsQueryable().BuildMock();

            repositoryMock.Setup(r => r.GetAll()).Returns(customers.Object);
            var result = await subject.GetByContractId(id, 1, 10, null);
            result.Items.First().TotalAmount.Should().Be(5 * 5.5m);
        }

        [Fact]
        public void GetShort_CallRepositoryGet()
        {
            var id = (new RandomGenerator()).Int();
            var result = subject.GetShortDetails(id);
            repositoryMock.Verify(r => r.Get(id, It.IsAny<Func<IQueryable<Customer>, IQueryable<Customer>>>()), Times.Once);
            mapperMock.Verify(m => m.Map<Customer, CustomerShortDetailsDto>(It.IsAny<Customer>()), Times.Once);
        }

        [Fact]
        public void GetById_CallRepositoryGet()
        {
            var id = (new RandomGenerator()).Int();
            var result = subject.Get(id);
            repositoryMock.Verify(r => r.Get(id, It.IsAny<Func<IQueryable<Customer>, IQueryable<Customer>>>()), Times.Once);
            mapperMock.Verify(m => m.Map<Customer, CustomerDto>(It.IsAny<Customer>()), Times.Once);
        }

        [Fact]
        public void DeleteById_CallRepositoryDelete()
        {
            var id = (new RandomGenerator()).Int();
            var result = subject.Delete(id);
            repositoryMock.Verify(r => r.Delete(id), Times.Once);
        }

        [Fact]
        public void Update_CallRepositoryUpdate()
        {
            var customerDto = Builder<CustomerDto>.CreateNew().Build();
            var result = subject.Update(customerDto);
            repositoryMock.Verify(r => r.Update(It.IsAny<Customer>()), Times.Once);
            mapperMock.Verify(m => m.Map<CustomerDto, Customer>(customerDto), Times.Once);
        }

        [Fact]
        public void Insert_CallRepositoryInsert()
        {
            var customerDto = Builder<CustomerDto>.CreateNew().Build();
            var result = subject.Insert(customerDto);
            repositoryMock.Verify(r => r.Insert(It.IsAny<Customer>()), Times.Once);
            mapperMock.Verify(m => m.Map<CustomerDto, Customer>(customerDto), Times.Once);
        }

        [Fact]
        public async void GetDepartmentsByContract_ReturnDepartmets()
        {
            Contract contract = Builder<Contract>.CreateNew().Build();
            var id = 1;

            var customers = Builder<Customer>
                .CreateListOfSize(5)
                .All()
                .With(c => c.Contract = contract)
                .TheFirst(5)
                .With(c => c.ContractId = id)
                .TheFirst(2)
                .With(c => c.Department = "AAA")
                .TheNext(3)
                .With(c => c.Department = "BBB")
                .Build()
                .AsQueryable().BuildMock();

            repositoryMock.Setup(r => r.GetByCondition(It.IsAny<Expression<Func<Customer, bool>>>())).Returns(customers.Object);
            var result = await subject.GetDepartmentsByContract(id, "");
            result.Should().BeEquivalentTo(new List<string> { "AAA", "BBB"});
        }
    }
}
