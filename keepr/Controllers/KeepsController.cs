using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CodeWorks.Auth0Provider;
using keepr.Models;
using keepr.Services;
using Microsoft.AspNetCore.Authorization;
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

        [HttpGet("{id}")]
        public ActionResult<Keep> Get(int id)
        {
            try
            {
                 Keep keep = _kservice.Get(id);
                 return Ok(keep);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Keep>> Create([FromBody] Keep newKeep)
        {
            try
            {
                 Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
                 newKeep.CreatorId = userInfo.Id;
                 Keep keep = _kservice.Create(newKeep);
                 return Ok(keep);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<Keep>> Delete(int id)
        {
            try
            {
                 Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
                 Keep keep = _kservice.Delete(id, userInfo.Id);
                 return Ok(keep);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
    }
}