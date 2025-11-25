using TheCopy.Shared.DataTransferObjects;
using System;
using System.Threading.Tasks;

namespace TheCopy.Application.Interfaces;

public interface IUserService
{
    Task<UserDto?> GetUserByIdAsync(Guid id);
}