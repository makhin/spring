using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Spring.Dto;
using Spring.Services;
using Spring.WebApi.Helpers;

namespace Spring.WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    //[Authorize(Policy = "Access Resources")] // Authorization policy for this API.
    public class InsuranceCasesController : Controller
    {
        private readonly IInsuranceCaseService _service;

        public InsuranceCasesController(IInsuranceCaseService service)
        {
            _service = service;
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

        [HttpPost("medical")]
        public async Task<IActionResult> Post([FromBody]MedicalInsuranceCaseDto value)
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
        public async Task<IActionResult> Put([FromBody]MedicalInsuranceCaseDto value)
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