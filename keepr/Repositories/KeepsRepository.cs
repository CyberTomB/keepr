using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using keepr.Interfaces;
using keepr.Models;

namespace keepr.Repositories
{
  public class KeepsRepository : IRepo<Keep, int>
  {
      private readonly IDbConnection _db;
      public KeepsRepository(IDbConnection db)
      {
          _db = db;
      }
    public List<Keep> GetAll()
    {
      string sql = "SELECT * FROM keeps;";
      return _db.Query<Keep>(sql).ToList();
    }

    public Keep GetById(int id)
    {
      throw new System.NotImplementedException();
    }
    public Keep Create(Keep newData)
    {
      throw new System.NotImplementedException();
    }

    public void Delete(int id)
    {
      throw new System.NotImplementedException();
    }

    public Keep Edit(Keep updatedData)
    {
      throw new System.NotImplementedException();
    }

  }
}