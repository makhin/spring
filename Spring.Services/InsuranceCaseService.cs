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
        Task<InsuranceCaseDto> Get(int id);
        Task<MedicalInsuranceCaseDto> UpdateMedical(MedicalInsuranceCaseDto dto);

        Task<MedicalInsuranceCaseDto> InsertMedical(MedicalInsuranceCaseDto dto);
    }

    public class InsuranceCaseService : IInsuranceCaseService
    {
        private readonly IRepository<InsuranceCase> _insuranceCaseRepository;
        private readonly IRepository<MedicalInsuranceCase> _medicalInsuranceCaseRepository;
        private readonly IMapper _mapper;

        public InsuranceCaseService(IRepository<InsuranceCase> insuranceCaseRepository, IMapper mapper, IRepository<MedicalInsuranceCase> medicalInsuranceCaseRepository)
        {
            _insuranceCaseRepository = insuranceCaseRepository;
            _mapper = mapper;
            _medicalInsuranceCaseRepository = medicalInsuranceCaseRepository;
        }

        public async Task<IEnumerable<InsuranceCaseItemDto>> GetAllByCustomerId(int id)
        {
            return await _insuranceCaseRepository.GetAll()
                .Where(c => c.CustomerId == id)
                .ProjectTo<InsuranceCaseItemDto>()
                .ToListAsync();
        }

        public async Task<InsuranceCaseDto> Get(int id)
        {
            var insuranceCase = await _insuranceCaseRepository.Get(id);

            if (insuranceCase is MedicalInsuranceCase)
            {
                var medicalInsuranceCase = await _medicalInsuranceCaseRepository.Get(id, ic => ic.Mkb10, ic => ic.Hospital, ic => ic.Orders);
                var medicalInsuranceCaseDto = _mapper.Map<MedicalInsuranceCase, MedicalInsuranceCaseDto>(medicalInsuranceCase);
                return medicalInsuranceCaseDto;
            }
            return null;
        }

        public async Task<MedicalInsuranceCaseDto> UpdateMedical(MedicalInsuranceCaseDto dto)
        {
            var medicalInsuranceCase = _mapper.Map<MedicalInsuranceCaseDto, MedicalInsuranceCase>(dto);
            await _medicalInsuranceCaseRepository.Update(medicalInsuranceCase);
            return dto;
        }

        public async Task<MedicalInsuranceCaseDto> InsertMedical(MedicalInsuranceCaseDto dto)
        {
            var medicalInsuranceCase = _mapper.Map<MedicalInsuranceCaseDto, MedicalInsuranceCase>(dto);
            await _medicalInsuranceCaseRepository.Insert(medicalInsuranceCase);
            return dto;
        }
    }
}
