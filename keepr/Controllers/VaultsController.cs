using System;
using System.Collections.Generic;
using keepr.Models;
using keepr.Services;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class VaultsController : ControllerBase
    {
        private readonly VaultsService _vservice;
        public VaultsController(VaultsService vservice)
        {
            _vservice = vservice;
        }

        [HttpGet]
        public ActionResult<List<Vault>> Get()
        {
            try
            {
                 List<Vault> vaults = _vservice.Get();
                 return Ok(vaults);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
    }
}