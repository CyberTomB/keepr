using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CodeWorks.Auth0Provider;
using keepr.Models;
using keepr.Services;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ProfilesController : ControllerBase
    {
        private readonly AccountService _aservice;
        private readonly KeepsService _kservice;
        private readonly VaultsService _vservice;

        public ProfilesController(AccountService aservice, KeepsService kservice, VaultsService vservice)
        {
            _aservice = aservice;
            _kservice = kservice;
            _vservice = vservice;
        }

        [HttpGet("{id}")]
        public ActionResult<Profile> Get(string id)
        {
            try
            {
                 Profile prof = _aservice.GetProfileById(id);
                 return prof;
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }

        [HttpGet("{id}/vaults")]
        public async Task<ActionResult<List<Vault>>> GetVaults(string id)
        {
        try
        {
            Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
            bool allowPrivate = false;
            if(userInfo != null){
                if(userInfo.Id == id){
                allowPrivate = true;
            }
            }
             List<Vault> vaults = _vservice.GetVaultsByCreator(id, allowPrivate);
             return Ok(vaults);
        }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }

        [HttpGet("{id}/keeps")]
        public ActionResult<List<Keep>> GetKeeps(string id)
        {
            try
            {
                 List<Keep> keeps = _kservice.GetKeepsByCreator(id);
                 return Ok(keeps);
            }
            catch (Exception err)
            {
                return BadRequest(err.Message);
            }
        }
    }
}