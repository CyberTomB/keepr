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
    internal Keep Edit(Keep editedKeep)
    {
      Keep original = Get(editedKeep.Id);
      if(original.CreatorId != null && original.CreatorId != editedKeep.CreatorId)
      {
        throw new Exception("Invalid Access");
      }
      // udpated edited fields
      original.Name = editedKeep.Name.Length > 0 ? editedKeep.Name : original.Name;
      original.Description = editedKeep.Description != null && editedKeep.Description.Length > 0 ? editedKeep.Description : original.Description;
      original.Img = editedKeep.Img != null && editedKeep.Img.Length > 0 ? editedKeep.Img : original.Img;
      original.Views = editedKeep.Views != original.Views ? editedKeep.Views : original.Views;
      original.Keeps = editedKeep.Keeps != original.Keeps ? editedKeep.Keeps : original.Keeps;
      original.Shares = editedKeep.Shares != original.Shares ? editedKeep.Shares : original.Shares;
      return _repo.Edit(original);

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