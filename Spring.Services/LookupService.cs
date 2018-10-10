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
        Task<IEnumerable<HospitalDto>> GetHospitals(int? parentId);
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

        public async Task<IEnumerable<HospitalDto>> GetHospitals(int? parentId)
        {
            return await _hospitalRepository.GetAll()
                .Where(c => c.ParentId == parentId)
                .OrderBy(c => c.Name)
                .ProjectTo<HospitalDto>()
                .ToListAsync();
        }

        public async Task<IEnumerable<Mkb10Dto>> GetMkb10(string s)
        {
            const int maxCount = 10;

            var byCode = await _mkb10Repository.GetAll()
                .Where(c => c.Code.StartsWith(s) && c.ParentId != null)
                .OrderBy(c => c.Id)
                .Take(maxCount)
                .ProjectTo<Mkb10Dto>()
                .ToListAsync();

            var countAsync = byCode.Count;

            if (countAsync < maxCount)
            {
                var byName = await _mkb10Repository.GetAll()
                    .Where(c => !c.Code.StartsWith(s) && c.Code.Contains(s) && c.ParentId != null)
                    .OrderBy(c => c.Id)
                    .Take(maxCount - countAsync)
                    .ProjectTo<Mkb10Dto>()
                    .ToListAsync();

                byCode.AddRange(byName);
            }

            return byCode;
        }

        public static List<T> ToList<T>() where T : struct
            => Enum.GetValues(typeof(T)).Cast<T>().ToList();
    }
}
