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
    setFront('');
    setBack('');

  }
    return(
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Edit a Card</h2>

          <input placeholder={front} value={front} onChange={(e) => setFront(e.target.value)}></input>
          <input placeholder={back} value={back} onChange={(e) => setBack(e.target.value)}></input>

          <button type="submit">Edit</button>

        </form>
      </div>
    );

  }
    

   


function DeckSettings(){
  const { decks, addCard, deleteCard, editCard } = useDeck();
  const {deckId} = useParams();

  const deck = decks.find(d => d.id === deckId);

  if (!deck){
    return (<div> <p>Deck not found</p> <br></br>
              <Link to="/">Home</Link> <br></br>
            </div>);
  }
  
  
  const cards = deck.cards; //Temporary 
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);


  function handleShowAddForm(){
    setShowAddForm(!showAddForm);
  }

  function handleShowEditForm(){
    setShowEditForm(!showEditForm);
  }



  //Fix edit button, form shows up on every row
  //Potentially have each card in an editable form and have one update button at the bottom
  return (
    <div>
      <div className="mainBody">
      <TopMargin />
      <button onClick={handleShowAddForm}> Add a card </button>
      {showAddForm && <AddCardForm />}
    <table>
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
        <td><button onClick={() => deleteCard(deck.id, cards[index].id)}>Delete Card</button></td>
        <td><button onClick={handleShowEditForm}> Edit card </button></td> 
        {showEditForm && <EditCardForm card={cards[index]} />}
        
       </tr>
     ))}
   </tbody>
 </table>
      {/* <div className="mainBody">
      <TopMargin />
      <button onClick={handleNextClick}> Next </button>
      <h2>
        <p>{flipCard ? backCard : frontCard}</p>
      </h2>
      <button onClick={handleFlipCard}> Flip </button>
      <h3>Card {index + 1 } of {cards.length}</h3>
      <button onClick={handleShowAddForm}> Add a card </button>
      {showAddForm && <AddCardForm onAdd={(card) => addCard(deck.id, card)} />}
      <button onClick={() => deleteCard(deck.id, cards[index].id)}>Delete Card</button>
      <button onClick={handleShowTable}> Show Deck </button>
      {showTable && <DisplayDeck cards={cards} />}
      
      </div> */}
      
      </div>
    </div>
  );

  
}

export default DeckSettings