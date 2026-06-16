import { useState } from 'react'
import hamburgerIcon from '../assets/hamburgerIcon.svg'
import '../App.css';
import { Link } from "react-router-dom";

export function TopMargin(){
  return(
    <div className="topMargin">
        <p></p>
        <p>Flash Card App</p>
        <div className="menuContainer"><IconMenu/></div>
        </div>

  );
}


  function IconMenu(){
    const [showMenu, setShowMenu] = useState(false);

    function handleShowMenu(){
      setShowMenu(!showMenu);
    }

    function MenuDisplay(){
      return (
        <div className="menuDisplay">
           <Link to="/deckSettings">Deck Settings</Link> <br></br>
           <Link to="/decks">Practice a deck</Link> <br></br>
           <Link to="/">Home</Link> <br></br>
           <Link to="/decksList">Decks List</Link>
        </div>

      );
    }

    return(
      <div>
        <button id="hamburgerButton" onClick={handleShowMenu}><img src={hamburgerIcon} alt="Drop down Menu"></img></button>
        {showMenu && <MenuDisplay />}
      </div>
    )
  }


function Home(){

  return (
    <div>
      <div className="mainBody">
      <TopMargin />
      
      </div>
      

    </div>
  );
  //<button onClick={() => deleteCard(cards[index].id)}>Delete Card</button>
  //<button onClick={handleShowAddForm}> Add a card </button>
  //{showAddForm && <AddCardForm onAdd={addCard} />}
  
}

export default Home