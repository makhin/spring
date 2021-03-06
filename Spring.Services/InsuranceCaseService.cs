﻿using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Spring.DbContext.Models;
using Spring.Dto;
using Spring.Repositories;

namespace Spring.Services
{
    public interface IInsuranceCaseService
    {
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

        public async Task<InsuranceCaseDto> Get(int id)
        {
            var insuranceCase = await _insuranceCaseRepository.Get(id, cases => cases);

            if (insuranceCase is MedicalInsuranceCase)
            {
                var medicalInsuranceCase = await _medicalInsuranceCaseRepository.Get(id, cases =>
                {
                    cases = cases.Include(ic => ic.Mkb10);
                    cases = cases.Include(ic => ic.Hospital);
                    cases = cases.Include(ic => ic.Orders);
                    cases = cases.Include(ic => ic.Customer);
                    return cases;
                });
                var medicalInsuranceCaseDto = _mapper.Map<MedicalInsuranceCase, MedicalInsuranceCaseDto>(medicalInsuranceCase);
                return medicalInsuranceCaseDto;
            }
            return null;
        }

        public async Task<MedicalInsuranceCaseDto> UpdateMedical(MedicalInsuranceCaseDto dto)
        {
            var medicalInsuranceCase = _mapper.Map<MedicalInsuranceCaseDto, MedicalInsuranceCase>(dto);
            //medicalInsuranceCase.TotalAmount = medicalInsuranceCase.Orders.Sum(o => o.Amount);
            await _medicalInsuranceCaseRepository.Update(medicalInsuranceCase);
            return dto;
        }

        public async Task<MedicalInsuranceCaseDto> InsertMedical(MedicalInsuranceCaseDto dto)
        {
            var medicalInsuranceCase = _mapper.Map<MedicalInsuranceCaseDto, MedicalInsuranceCase>(dto);
            //medicalInsuranceCase.TotalAmount = medicalInsuranceCase.Orders.Sum(o => o.Amount);
            await _medicalInsuranceCaseRepository.Insert(medicalInsuranceCase);
            return dto;
        }
    }
}
