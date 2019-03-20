using System.Linq;
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
    public class LookupServiceTests
    {
        private readonly Mock<IRepository<Hospital>> repositoryHospitalMock = new Mock<IRepository<Hospital>>();
        private readonly Mock<IRepository<Mkb10>> repositoryMkbMock = new Mock<IRepository<Mkb10>>();
        private readonly LookupService subject;

        public LookupServiceTests()
        {
            subject = new LookupService(repositoryHospitalMock.Object, repositoryMkbMock.Object);
        }

        [Fact(Skip = "find way mock ProjectTo")]
        public async void GetHospitals_CallRepositoryUpdate()
        {
            Mapper.Reset();
            Mapper.Initialize(m => m.AddProfile<MappingProfile>());

            var expected = 5;

            var parentId = 1;

            var hospitals = Builder<Hospital>
                .CreateListOfSize(expected)            
                .All()
                .TheFirst(5).With(h => h.ParentId = parentId)
                .Build()
                .AsQueryable().BuildMock();

            repositoryHospitalMock.Setup(r => r.GetAll()).Returns(hospitals.Object);
            var result = await subject.GetHospitals(parentId);
            var hospitalDtos = result.ToList();
            hospitalDtos.Should().HaveCount(expected);
            hospitalDtos.Should().BeInAscendingOrder(h => h.Name);
        }
    }
}
