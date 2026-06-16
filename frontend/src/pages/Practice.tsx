import { TopMargin } from "./Home";
import { useParams } from "react-router-dom";
import { useDeck } from "../context/DeckContext";
import { useState } from 'react'
import '../App.css';
import { Link } from "react-router-dom";
import {type Card} from "../types/Card";







 function DisplayDeck({cards}: {cards: Card[]}){

   return(<table>
  <thead>
     <tr>
      <th>Number</th>
      <th>Front</th>
      <th>Back</th>
     </tr>
   </thead>

   <tbody>
     {cards.map((card, index) => (
       <tr key={card.id}>
        <td>{index+1}</td>
        <td>{card.front}</td>
        <td>{card.back}</td>
       </tr>
     ))}
   </tbody>
 </table>);
  
  
 }
   


function Practice(){
  const { decks } = useDeck();
  const {deckId} = useParams();

  const deck = decks.find(d => d.id === deckId);

  if (!deck){
    return (<div> <p>Deck not found</p> <br></br>
              <Link to="/">Home</Link> <br></br>
            </div>);
  }
  
  
  const cards = deck.cards; //Temporary 
  const [index, setIndex] = useState(0);
  const [flipCard, setFlipCard] = useState(false);
  const hasNext = index < cards.length - 1;

  function handleFlipCard() {
    setFlipCard(!flipCard);
  }


  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
      setFlipCard(false);

    } else {
      setIndex(0);
      setFlipCard(false);
    }
  }
  

  let frontCard = "There is no card";
  let backCard = "There is no card";
  if (cards.length > 0) {
   frontCard = cards[index].front;
   backCard = cards[index].back;
}



  

  return (
    <div>
       <div className="mainBody">
      <TopMargin />
      <button onClick={handleNextClick}> Next </button>
      <h2>
        <p>{flipCard ? backCard : frontCard}</p>
      </h2>
      <button onClick={handleFlipCard}> Flip </button>
      <h3>Card {index + 1 } of {cards.length}</h3>
      {/* <button onClick={handleShowTable}> Show Deck </button>
      {showTable && <DisplayDeck cards={cards} />} */}
      
      </div> *
      
      
    </div>
  );

  
}

export default Practice