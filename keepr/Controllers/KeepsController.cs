using System;
using System.Collections.Generic;
using keepr.Models;
using keepr.Services;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class KeepsController : ControllerBase
    {
        private readonly KeepsService _kservice;
        public KeepsController(KeepsService kservice)
        {
            _kservice = kservice;
        }

        [HttpGet]
        public ActionResult<List<Keep>> Get()
        {
            try
            {
                 List<Keep> keeps = _kservice.Get();
                 return Ok(keeps);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
    }
}