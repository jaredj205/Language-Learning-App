import { TopMargin } from "./Home";
import { useParams } from "react-router-dom";
import { useDeck } from "../context/DeckContext";
import { useState } from 'react'
import '../App.css';
import { Link } from "react-router-dom";
import {type Card} from "../types/Card";
import {type Deck} from "../types/Deck";



type EditCardFormProps = {
  card: Card;
};

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



function AddCardForm(){
  const {deckId} = useParams();
  const {decks, addCard} = useDeck();
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const deck = decks.find(d => d.id === deckId);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    if (!deck){
    return (<div> <p>Deck not found</p> <br></br>
              <Link to="/">Home</Link> <br></br>
            </div>);
  }



    addCard(deck.id, {front,back, id: crypto.randomUUID()});
    setFront('');
    setBack('');

  }
    return(
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Add a Card</h2>

          <input placeholder="Front" value={front} onChange={(e) => setFront(e.target.value)}></input>
          <input placeholder="Back" value={back} onChange={(e) => setBack(e.target.value)}></input>

          <button type="submit">Add</button>

        </form>
      </div>
    );

  }

  function EditCardForm({card}: EditCardFormProps){
  const {deckId} = useParams();
  const {decks, editCard} = useDeck();
  const [front, setFront] = useState(card.front);
  const [back, setBack] = useState(card.back);
  const deck = decks.find(d => d.id === deckId);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    if (!deck){
    return (<div> <p>Deck not found</p> <br></br>
              <Link to="/">Home</Link> <br></br>
            </div>);
  }


    editCard(deck.id, {front,back, id: card.id});

  }
    return(
      <div>
        <form onSubmit={handleSubmit}>
          

          <input placeholder={front} value={front} onChange={(e) => setFront(e.target.value)}></input>
          <input placeholder={back} value={back} onChange={(e) => setBack(e.target.value)}></input>

          <button type="submit">Edit</button>

        </form>
      </div>
    );

  }

    

   


function DeckSettings(){
  const { decks, deleteDeck, addCard, deleteCard, editCard, editDeck } = useDeck();
  const {deckId} = useParams();

  const deck = decks.find(d => d.id === deckId);

  if (!deck){
    return (<div> <p>Deck not found</p> <br></br>
              <Link to="/">Home</Link> <br></br>
            </div>);
  }

   function populateDeck(){
    if (!deck){
    return (<div> <p>Deck not found</p> <br></br>
              <Link to="/">Home</Link> <br></br>
            </div>);
  }

    for(let i = 0; i< 50; i++){
      addCard(deck.id, {front: "front " + i, back: "back " + i, id: crypto.randomUUID()});

    }

  }
  
  const cards = deck.cards; //Temporary 

  //<p>{flipCard ? backCard : frontCard}</p>
  //<td>{showEditForm && <EditCardForm card={cards[index]} />}</td>
  //Fix edit button, form shows up on every row
  //Potentially have each card in an editable form and have one update button at the bottom
  return (
    <div>
      <div className="mainBody">
      <TopMargin />
      <input value={deck.name} onChange={(e) => editDeck(deck.id, e.target.value)}></input> <br></br>
      <button onClick={() => addCard(deck.id, {front:"", back:"", id: crypto.randomUUID()})}> Add a card </button>
      <button onClick={() => populateDeck()}>Populate Deck </button>
      <button onClick={() => deleteDeck(deck.id)}>Delete Deck</button>
      <div className="editDeckSection">
    <table className="editDeckTable">
  <thead>
     <tr>
      <th>Number</th>
      <th>Front</th>
      <th>Back</th>
      <th>Delete</th>
     </tr>
   </thead>
   
   <tbody>
     {cards.map((card, index) => (
       <tr key={card.id}>
        <td>{index+1}</td>
        <td><input value={card.front} onChange={(e) => editCard(deck.id, {...card, front: e.target.value})}></input></td>
        <td><input value={card.back} onChange={(e) => editCard(deck.id, {...card, back: e.target.value})}></input></td> 
        <td><button onClick={() => deleteCard(deck.id, cards[index].id)}>Delete Card</button></td>
        
       </tr>
     ))}
   </tbody>
 </table>
 </div>

      </div>
    </div>
//     <div>
//       <div className="mainBody">
//       <TopMargin />
//       <button onClick={handleShowAddForm}> Add a card </button>
//       <button onClick={handleShowEditForm}> Toggle Edit card </button>
//       <button onClick={() => populateDeck()}>Populate Deck </button>
//       {showAddForm && <AddCardForm />}
//     <table className="editDeckTable">
//   <thead>
//      <tr>
//       <th>Number</th>
//       <th>{showEditForm ? "Front" :  "Front Back"}</th>
//       <th>{showEditForm ? "Back" :  null}</th>
//       <th>Delete</th>
//      </tr>
//    </thead>
   
//    <tbody>
//      {cards.map((card, index) => (
//        <tr key={card.id}>
//         <td>{index+1}</td>
//         <td>{showEditForm ? card.front : <EditCardForm card={cards[index]} />}</td>
//         <td>{showEditForm ? card.back :  null}</td> 
//         <td><button onClick={() => deleteCard(deck.id, cards[index].id)}>Delete Card</button></td>
        
        
        
//        </tr>
//      ))}
//    </tbody>
//  </table>
//       </div>
//     </div>
  );

  
}

export default DeckSettings