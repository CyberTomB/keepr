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
      string sql = @"
      SELECT
      a.*,
      k.*
      FROM keeps k
      JOIN accounts a ON a.id = k.creatorId
      WHERE k.id = @id;
      ";
      return _db.Query<Profile, Keep, Keep>(sql, (prof, keep) =>
      {
          keep.Creator = prof;
          return keep;
      }, new {id}, splitOn: "id").FirstOrDefault();
    }
    public Keep Create(Keep newData)
    {
      string sql = @"
      INSERT INTO keeps
      (name, description, imgUrl, creatorId)
      VALUES
      (@Name, @Description, @ImgUrl, @CreatorId);
      SELECT LAST_INSERT_ID();
      ";
      int id = _db.ExecuteScalar<int>(sql, newData);
      return GetById(id);
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