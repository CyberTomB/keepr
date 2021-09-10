using System;
using System.Collections.Generic;
using keepr.Models;
using keepr.Repositories;

namespace keepr.Services
{
  public class KeepsService
  {
      private readonly KeepsRepository _repo;
      public KeepsService(KeepsRepository repo)
      {
          _repo = repo;
      }
    internal List<Keep> Get()
    {
      return _repo.GetAll();
    }

    internal Keep Get(int id)
    {
      Keep keep = _repo.GetById(id);
      if (keep == null)
      {
        throw new Exception("Invalid ID");
      }
      return keep;
    }
    internal Keep Create(Keep newKeep)
    {
      return _repo.Create(newKeep);
    }

    internal Keep Delete(int keepId, string creatorId)
    {
      Keep keepToDelete = Get(keepId);
      if(keepToDelete.CreatorId != creatorId)
      {
        throw new Exception("Invalid Access");
      }
      _repo.Delete(keepId);
      return keepToDelete;
    }
  }
}