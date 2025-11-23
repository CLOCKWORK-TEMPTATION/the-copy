
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TheCopy.Server.Services;
using TheCopy.Shared.DataTransferObjects;

namespace TheCopy.Server.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequestDto model)
    {
        try
        {
            var user = await _authService.Register(model);
            return Ok(new { message = "Registration successful" });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }

    [HttpPost("login")]
    public IActionResult Login(LoginRequestDto model)
    {
        try
        {
            var token = _authService.Login(model);
            return Ok(new { token });
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
