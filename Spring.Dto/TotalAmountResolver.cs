using System.Linq;
using AutoMapper;
using Spring.DbContext.Models;

namespace Spring.Dto
{
    public class TotalAmountResolver : IValueResolver<MedicalInsuranceCaseDto, MedicalInsuranceCase, decimal?>
    {
        public decimal? Resolve(MedicalInsuranceCaseDto source, MedicalInsuranceCase destination, decimal? member, ResolutionContext context)
        {
            decimal? result = null;
            if (source.Orders != null  && source.Orders.Any())
            {
                result = source.Orders.Sum(o => o.Amount);
            } 
            if (source.FoodCosts.HasValue)
            {
                result = (result ?? 0) + source.FoodCosts.Value;
            }
            if (source.DiagnosisCosts.HasValue)
            {
                result = (result ?? 0) + source.DiagnosisCosts.Value;
            }
            if (source.Treatment—osts.HasValue)
            {
                result = (result ?? 0) + source.Treatment—osts.Value;
            }

            return result;
        }
    }
}