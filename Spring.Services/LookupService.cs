using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Spring.DbContext.Models;
using Spring.Dto;
using Spring.Repositories;

namespace Spring.Services
{
    public interface ILookupService
    {
        Task<IEnumerable<HospitalDto>> GetHospitals(int parentid);
        Task<IEnumerable<Mkb10Dto>> GetMkb10(string s);
    }

    public class LookupService : ILookupService
    {
        private readonly IRepository<Hospital> _hospitalRepository;
        private readonly IRepository<Mkb10> _mkb10Repository;

        public LookupService(IRepository<Hospital> hospitalRepository, IRepository<Mkb10> mkb10Repository)
        {
            _hospitalRepository = hospitalRepository;
            _mkb10Repository = mkb10Repository;
        }

        public async Task<IEnumerable<HospitalDto>> GetHospitals(int parentId)
        {
            return await _hospitalRepository.GetAll()
                .Where(c => c.ParentId == parentId)
                .OrderBy(c => c.Name)
                .ProjectTo<HospitalDto>()
                .ToListAsync();
        }

        public async Task<IEnumerable<Mkb10Dto>> GetMkb10(string s)
        {
            return await _mkb10Repository.GetAll()
                .Where(c => c.Code.Contains(s))
                .Take(10)
                .OrderBy(c => c.Code)
                .ProjectTo<Mkb10Dto>()
                .ToListAsync();
        }

        public static List<T> ToList<T>() where T : struct
            => Enum.GetValues(typeof(T)).Cast<T>().ToList();
    }
}
