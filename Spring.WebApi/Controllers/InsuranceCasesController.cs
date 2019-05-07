using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Spring.Dto;
using Spring.Services;
using Spring.WebApi.Helpers;

namespace Spring.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [ApiConventionType(typeof(DefaultApiConventions))]
    //[Authorize(Policy = "Access Resources")] // Authorization policy for this API.
    public class InsuranceCasesController : ControllerBase
    {
        private readonly IInsuranceCaseService _service;

        public InsuranceCasesController(IInsuranceCaseService service)
        {
            _service = service;
        }

        [HttpGet("{id}/full")]
        [ProducesResponseType(typeof(InsuranceCaseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<InsuranceCaseDto>> GetById(int id)
        {
            var value = await _service.Get(id);            
            if (value == null)
            {
                return NoContent();
            }

            return Ok(value);
        }

        [HttpPost("medical")]
        [ProducesResponseType(typeof(void), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Post([FromBody]MedicalInsuranceCaseDto value)
        {
            ICollection<ValidationResult> results;

            if (!value.IsModelValid(out results))
            {
                return BadRequest(results);
            }

            try
            {
                await _service.UpdateMedical(value);
                return Ok();
            }
            catch (Exception)
            {
                return NotFound("An error occurred; record not updated");
            }
        }

        // POST api/sampleData
        [HttpPut("medical")]
        [ProducesResponseType(typeof(MedicalInsuranceCaseDto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<MedicalInsuranceCaseDto>> Put([FromBody]MedicalInsuranceCaseDto value)
        {
            ICollection<ValidationResult> results;

            if (!value.IsModelValid(out results))
            {
                return BadRequest(results);
            }

            try
            {
                await _service.InsertMedical(value);
                return Ok(value);
            }
            catch (Exception)
            {
                return NotFound("An error occurred; new record not saved");
            }
        }
    }
}