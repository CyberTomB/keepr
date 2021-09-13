using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using keepr.Models;
using keepr.Services;
using CodeWorks.Auth0Provider;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly AccountService _accountService;
        private readonly VaultsService _vservice;

        public AccountController(AccountService accountService, VaultsService vservice)
        {
            _accountService = accountService;
            _vservice = vservice;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<Account>> Get()
        {
            try
            {
                Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
                return Ok(_accountService.GetOrCreateProfile(userInfo));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("vaults")]
        [Authorize]
        public async Task<ActionResult<List<Vault>>> GetVaults()
        {
            try
            {
                 Account userInfo = await HttpContext.GetUserInfoAsync<Account>();
                 List<Vault> vaults = _vservice.GetVaultsByCreator(userInfo.Id, true);
                 return Ok(vaults);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }


}