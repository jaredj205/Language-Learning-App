import { TopMargin } from "./Home";
import { useParams } from "react-router-dom";
import { useDeck } from "../context/DeckContext";
import { useState } from 'react'
import { Link } from "react-router-dom";
import '../App.css';




function Createdeck(){
  const {addDeck} = useDeck();
  const [name, setName] = useState('');
  

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    addDeck(name);
    setName('');

  }
    return(
      <div>
        <form onSubmit={handleSubmit}>

          <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>

          <button type="submit">Create</button>

        </form>
      </div>
    );

  }

  //TO DO: Add ability to choose settings or practice
export default function DeckList(){
    const {decks} = useDeck();
    const [showAddForm, setShowAddForm] = useState(false);

    function handleShowAddForm(){
    setShowAddForm(!showAddForm);
  }

    return(
        <div>
            <TopMargin/>
            <div className="mainBody">
        <p>Select your deck</p>

        {decks.map(deck => (
            <div key={deck.id}>
                <Link className="deckLink"to={`/decks/${deck.id}`}>{deck.name}</Link>
                </div>
        ))}

        <button onClick={handleShowAddForm}>Create a deck</button>
        {showAddForm && <Createdeck />}
        </div>
        </div>
    );
}