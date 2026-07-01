using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CardsController : ControllerBase
{
    [HttpGet]
    public IActionResult GetCards()
    {
        return Ok(new[]
        {
            new { Front = "dom", Back = "house" },
            new { Front = "nie", Back = "no" }


        });
    }
}