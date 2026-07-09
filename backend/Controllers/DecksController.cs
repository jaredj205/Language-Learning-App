using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DecksController : ControllerBase
{
    private static List<Deck> decks = new();

    [HttpGet]
    public IActionResult GetDecks()
    {
        return Ok(decks);
        
    }

    [HttpPost]
    public IActionResult CreateDeck([FromBody] Deck deck)
    {
        
        decks.Add(deck);
        return Ok(deck);
        
    }

    [HttpDelete("{id}")]
    public IActionResult RemoveDeck(string id)
    {
        var deck = decks.FirstOrDefault(d => d.Id == id);

        if (deck == null)
            {
                return NotFound(); 
            }
            

        decks.Remove(deck);

        return Ok(decks);
    }

    [HttpPut("{id}")]
    public IActionResult UpdateDeck(string id, [FromBody] Deck updatedDeck)
    {
        var deck = decks.FirstOrDefault(d => d.Id == id);

        if (deck == null)
        {
            return NotFound(); 
        }
        deck.Name = updatedDeck.Name;
        return Ok(decks);
        
    }

}