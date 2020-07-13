using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AureliaCrud.DTO;
using AureliaCrud.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;

namespace AureliaCrud.Controllers
{
    [Route("api/[controller]")]
    public class ApplicantController : Controller
    {
        private readonly ILogger<ApplicantController> _logger;
        private string _message = string.Empty;

        private IApplicantRepository _repo;
        private ICommon _commonrepo;
        public ApplicantController(IApplicantRepository repo, ICommon commonrepo, ILogger<ApplicantController> logger)
        {
            _repo = repo;
            _commonrepo = commonrepo;
            _logger = logger;
        }


        [HttpGet("getall")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<IEnumerable<ApplicantDTO>> Get()
        {
            try
            {
                return _repo.GetAllApplicants();
            }
            catch (Exception ex)
            {
                _logger.LogInformation($"Failed to retrieve records, Error {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("get")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<ApplicantDTO> Get(int id)
        {
            try
            {
                var data = _commonrepo.Get(id);
                return _repo.GetApplicant(id);
            }
            catch (Exception ex)
            {
                _logger.LogInformation($"Failed to get record, Error {ex.Message}");
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("add")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<ApplicantDTO> Add([FromBody]ApplicantDTO dto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    dto = _repo.AddApplicant(dto);
                    _logger.LogInformation($"Applicant record inserted successfully with name {dto.Name} ");
                    return CreatedAtRoute("Get", new { id = dto.Id }, dto);
                }
                catch (Exception ex)
                {
                    _logger.LogInformation($"Failed to insert record with name {dto.Name}, Error {ex.Message}");
                    return BadRequest(ex);
                }

            }
            else
            {
                StringBuilder errors = Errors();
                _logger.LogInformation($"Validation errors for record with name {dto.Name} erros : {errors} ");
                return BadRequest(errors);
            }
        }

        [HttpPut("update")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<ApplicantDTO> Update([FromBody]ApplicantDTO dto)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    _logger.LogInformation($"Updating record with name {dto.Name} ");
                    _repo.UpdateApplicant(dto);
                    _message = $"Record updated successfully with name {dto.Name} ";
                    _logger.LogInformation(_message);
                    return Ok(_message);
                }
                catch (Exception ex)
                {
                    _logger.LogInformation($"Failed to update record with name {dto.Name}, Error {ex.Message}");
                    return BadRequest(ex);
                }

            }
            else
            {
                StringBuilder errors = Errors();
                _logger.LogInformation($"Validation errors for record with name {dto.Name} erros : {errors} ");
                return BadRequest(errors);
            }

        }

        private StringBuilder Errors()
        {
            StringBuilder errors = new StringBuilder();
            foreach (var modelState in ModelState.Values)
            {
                foreach (var error in modelState.Errors)
                {
                    errors.Append(error.ErrorMessage);
                }
            }
            return errors;
        }

        [HttpDelete("delete")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Delete(int id)
        {
            try
            {
                _repo.DeleteApplicant(id);
                _message = $"Applicant deleted succesfully";
                _logger.LogInformation(_message);
                return Ok(_message);
            }
            catch (Exception ex)
            {
                _logger.LogInformation($"Failed to delete applicant,Error {ex.Message}");
                return BadRequest(ex.Message);
            }
        }

    }
}
