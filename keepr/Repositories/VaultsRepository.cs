using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using keepr.Interfaces;
using keepr.Models;

namespace keepr.Repositories
{
  public class VaultsRepository : IRepo<Vault, int>
  {
      private readonly IDbConnection _db;
      public VaultsRepository(IDbConnection db)
      {
          _db = db;
      }
      public List<Vault> GetAll()
    {
      string sql = "SELECT * FROM vaults;";
      return _db.Query<Vault>(sql).ToList();
    }

    public Vault GetById(int id)
    {
      throw new System.NotImplementedException();
    }
    public Vault Create(Vault newData)
    {
      throw new System.NotImplementedException();
    }

    public void Delete(int id)
    {
      throw new System.NotImplementedException();
    }

    public Vault Edit(Vault updatedData)
    {
      throw new System.NotImplementedException();
    }

    
  }
}