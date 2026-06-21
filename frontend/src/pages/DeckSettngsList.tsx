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
export default function DeckSettingsList(){
    const {decks, deleteDeck} = useDeck();
    const [showAddForm, setShowAddForm] = useState(false);

    function handleShowAddForm(){
    setShowAddForm(!showAddForm);
  }

    return(
        <div>
            <TopMargin/>
            <div className="mainBody">
        <p id="bodyText">Select your deck to adjust</p>
        <div className="deckSettingsLayout">
        {decks.map(deck => (
            <div key={deck.id}>
                <Link className="deckLink" to={`/deckSettings/${deck.id}`}>{deck.name}({deck.cards.length} Cards)</Link>
                <br></br>
                <button onClick={() => deleteDeck(deck.id)}>Delete Deck</button>
                </div>
        ))}
        </div>

        <button onClick={handleShowAddForm}>Create a deck</button>
        {showAddForm && <Createdeck />}

        </div>


        
        </div>
    );
}