using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Spring.Common.Enums;
using Spring.Services;

namespace Spring.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class LookupController : Controller
    {
        private readonly ILookupService _service;

        public LookupController(ILookupService service)
        {
            _service = service;
        }

        [HttpGet("therapy")]
        public IActionResult GetTherapy()
        {
            return Ok(LookupService.ToList<Therapy>());
        }

        [HttpGet("treatment")]
        public IActionResult GetTreatments()
        {
            return Ok(LookupService.ToList<Treatment>());
        }

        [HttpGet("{id}/hospital")]
        public async Task<IActionResult> GetHospitals(int? id)
        {
            return Ok(await _service.GetHospitals(id));
        }

        [HttpGet("{s}/mkb10")]
        public async Task<IActionResult> GetMkb10(string s)
        {
            return Ok(await _service.GetMkb10(s));
        }
    }
}