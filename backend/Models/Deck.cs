namespace backend.Models;

public class Deck
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = "";
    
    public List<Card> Cards { get; set; } = new();
}