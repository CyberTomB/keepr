using keepr.Models;
using keepr.Repositories;

namespace keepr.Services
{
  public class VaultKeepsService
  {
      private readonly VaultKeepsRepository _vkr;
      public VaultKeepsService(VaultKeepsRepository vkr)
      {
          _vkr = vkr;
      }
    internal VaultKeep Create(VaultKeep newVK)
    {
      return _vkr.Create(newVK);
    }
  }
}