
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TheCopy.Server.Data;
using TheCopy.Server.Entities;
using TheCopy.Server.Services;
using TheCopy.Shared.DataTransferObjects;

namespace TheCopy.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ScriptsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly MongoService _mongoService;

    public ScriptsController(ApplicationDbContext context, MongoService mongoService)
    {
        _context = context;
        _mongoService = mongoService;
    }

    [HttpPost]
    public async Task<IActionResult> Create(ScriptDto scriptDto)
    {
        var script = new Script
        {
            ProjectId = scriptDto.ProjectId,
            Name = scriptDto.Name,
            Content = scriptDto.Content,
            CreatedAt = DateTime.UtcNow
        };

        _context.Scripts.Add(script);
        await _context.SaveChangesAsync();

        var scriptAnalysis = new { ScriptId = script.Id, Status = "Pending" };
        await _mongoService.GetCollection<object>("ScriptAnalyses").InsertOneAsync(scriptAnalysis);

        scriptDto.Id = script.Id;
        scriptDto.CreatedAt = script.CreatedAt;

        return Ok(scriptDto);
    }
}
