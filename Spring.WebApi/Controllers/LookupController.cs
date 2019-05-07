using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Spring.Common.Enums;
using Spring.Dto;
using Spring.Services;

namespace Spring.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [ApiConventionType(typeof(DefaultApiConventions))]
    public class LookupController : ControllerBase
    {
        private readonly ILookupService _service;

        public LookupController(ILookupService service)
        {
            _service = service;
        }

        [HttpGet("therapy")]
        [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<string>> GetTherapy()
        {
            return Ok(LookupService.ToList<Therapy>());
        }

        [HttpGet("treatment")]
        [ProducesResponseType(typeof(IEnumerable<string>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<IEnumerable<string>> GetTreatments()
        {
            return Ok(LookupService.ToList<Treatment>());
        }

        [HttpGet("{id}/hospital")]
        [ProducesResponseType(typeof(IEnumerable<HospitalDto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<HospitalDto>>> GetHospitals(int? id)
        {
            return Ok(await _service.GetHospitals(id));
        }

        [HttpGet("{s}/mkb10")]
        [ProducesResponseType(typeof(IEnumerable<Mkb10Dto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]

        public async Task<ActionResult<IEnumerable<Mkb10Dto>>> GetMkb10(string s)
        {
            return Ok(await _service.GetMkb10(s));
        }
    }
}