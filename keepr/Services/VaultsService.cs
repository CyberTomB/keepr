using System.Collections.Generic;
using keepr.Models;
using keepr.Repositories;

namespace keepr.Services
{
  public class VaultsService
  {
      private readonly VaultsRepository _repo;
      public VaultsService(VaultsRepository repo)
      {
          _repo = repo;
      }
    internal List<Vault> Get()
    {
      return _repo.GetAll();
    }
  }
}