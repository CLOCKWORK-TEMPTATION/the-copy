using TheCopy.Shared.DTOs;

namespace TheCopy.Application.Interfaces;

public interface IProjectService
{
    Task<List<ProjectDto>> GetAllProjectsAsync(Guid userId);
    Task<ProjectDto> CreateProjectAsync(CreateProjectDto request, Guid userId);
}
