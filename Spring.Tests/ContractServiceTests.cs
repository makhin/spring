using System;
using System.Linq;
using System.Security.AccessControl;
using AutoMapper;
using FizzWare.NBuilder;
using FluentAssertions;
using Moq;
using Spring.DbContext.Models;
using Spring.Dto;
using Spring.Repositories;
using Spring.Services;
using Xunit;

namespace Spring.Tests
{
    public class ContractServiceTests
    {
        private readonly Mock<IRepository<Contract>> repositoryMock = new Mock<IRepository<Contract>>();
        private readonly Mock<IMapper> mapperMock = new Mock<IMapper>();
        private readonly ContractService subject;

        public ContractServiceTests()
        {
            subject = new ContractService(repositoryMock.Object, mapperMock.Object);
        }

        [Fact]
        public void GetAll_CallRepositoryGetAll()
        {
            var result = subject.GetAll();
            repositoryMock.Verify(r => r.GetAll(), Times.Once);
        }

        [Fact]
        public void GetById_CallRepositoryGet()
        {
            var id = (new RandomGenerator()).Int();
            var result = subject.Get(id);
            repositoryMock.Verify(r => r.Get(id, It.IsAny<Func<IQueryable<Contract>, IQueryable<Contract>>>()), Times.Once);
            mapperMock.Verify(m=>m.Map<Contract, ContractDto>(It.IsAny<Contract>()), Times.Once);
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
            var contract = Builder<ContractDto>.CreateNew().Build();
            var result = subject.Update(contract);
            repositoryMock.Verify(r => r.Update(It.IsAny<Contract>()), Times.Once);
            mapperMock.Verify(m => m.Map<ContractDto, Contract>(contract), Times.Once);
        }

        [Fact]
        public void Insert_CallRepositoryInsert()
        {
            var contract = Builder<ContractDto>.CreateNew().Build();
            var result = subject.Insert(contract);
            repositoryMock.Verify(r => r.Insert(It.IsAny<Contract>()), Times.Once);
            mapperMock.Verify(m => m.Map<ContractDto, Contract>(contract), Times.Once);
        }
    }
}
