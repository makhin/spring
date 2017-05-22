using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Spring.Dto;
using Spring.Services;

namespace Spring.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class InsuranceCasesController : Controller
    {
        private readonly IInsuranceCaseService _service;

        public InsuranceCasesController(IInsuranceCaseService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetByCustomerId(int id)
        {
            var value = await _service.GetAllByCustomerId(id);
            if (value == null)
            {
                return NoContent();
            }

            return Ok(value);
        }

        [HttpGet("{id}/full")]
        public async Task<IActionResult> GetById(int id)
        {
            var value = await _service.Get(id);            
            if (value == null)
            {
                return NoContent();
            }

            return Ok(value);
        }
    }
}