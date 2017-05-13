using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Spring.DbContext.DbContext;
using Spring.DbContext.Models;

namespace Spring.Repositories
{
    public interface IRepository<TDto, TTable> where TDto : IEntityBase where TTable : class, IEntityBase
    {
        Task<IEnumerable<TDto>> AllByCondition(Expression<Func<TDto, bool>> predicate);
        Task<IEnumerable<TDto>> GetAll();
        Task<TDto> Get(int id);
        Task<TDto> Insert(TDto entity);
        Task<TDto> Update(TDto entity);
        Task<int> Delete(int id);
    }

    public class Repository<TDto, TTable> : IRepository<TDto, TTable> where TDto : IEntityBase where TTable : class, IEntityBase
    {
        private readonly SpringDbContext context;
        private readonly IMapper _mapper;
        private readonly DbSet<TTable> entities;

        public Repository(SpringDbContext context, IMapper mapper)
        {
            this.context = context;
            _mapper = mapper;
            entities = context.Set<TTable>();
        }

        public async Task<IEnumerable<TDto>> AllByCondition(Expression<Func<TDto, bool>> predicate)
        {
            return await entities.ProjectTo<TDto>().Where(predicate).ToListAsync();
        }

        public async Task<IEnumerable<TDto>> GetAll()
        {
            return await entities.ProjectTo<TDto>().ToListAsync();
        }

        public async Task<TDto> Get(int id)
        {
            var entity = await entities.DefaultIfEmpty(null).SingleOrDefaultAsync(a => a.Id == id);            
            return _mapper.Map<TDto>(entity);
        }

        public async Task<TDto> Insert(TDto dto)
        {
            try
            {
                dto.Id = 0;
                var entity = _mapper.Map<TTable>(dto);
                await context.AddAsync(entity);
                await context.SaveChangesAsync();
                return dto;
            }
            catch (DbUpdateException exception)
            {
                Debug.WriteLine("An exception occurred: {0}, {1}", exception.InnerException, exception.Message);
                throw new Exception("An error occurred; new record not saved");
            }
        }
        public async Task<TDto> Update(TDto dto)
        {
            bool recordExists = entities.Any(a => a.Id == dto.Id);

            if (!recordExists)
            {
                throw new Exception("An error occurred; record not found");
            }

            try
            {
                var entity = _mapper.Map<TTable>(dto);
                entities.Update(entity);
                await context.SaveChangesAsync();
                return dto;
            }
            catch (DbUpdateException exception)
            {
                Debug.WriteLine("An exception occurred: {0}, {1}", exception.InnerException, exception.Message);
                throw new Exception("An error occurred; record not updated");
            }
        }

        public async Task<int> Delete(int id)
        {
            TTable entity = await entities.AsNoTracking().SingleOrDefaultAsync(m => m.Id == id);

            if (entity == null)
            {
                throw new Exception("Record not found; not deleted");
            }

            try
            {
                entities.Remove(entity);
                return await context.SaveChangesAsync();
            }
            catch (DbUpdateException exception)
            {
                Debug.WriteLine("An exception occurred: {0}, {1}", exception.InnerException, exception.Message);
                throw new Exception("An error occurred; not deleted");
            }
        }
    }
}
