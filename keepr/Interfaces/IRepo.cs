using System.Collections.Generic;

namespace keepr.Interfaces
{
    public interface IRepo<T, idType>
    {
        List<T> GetAll();
        T GetById(idType id);
        T Create(T newData);
        T Edit(T updatedData);
        void Delete(idType id);
    }
}