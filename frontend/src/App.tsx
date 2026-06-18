import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DeckSettings from './pages/DeckSettings';
import './App.css';
import Practice from "./pages/Practice";
import { DeckProvider } from "./context/DeckContext";
import DeckList from "./pages/DecksList";
import DeckSettingsList from "./pages/DeckSettngsList";

function App(){
  return(
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/deckSettingsList" element={<DeckSettingsList />} />
      <Route path="/deckSettings" element={<DeckSettings />} />
      <Route path="/deckSettings/:deckId" element={<DeckSettings />} />
      <Route path="/decks" element={<Practice />} />
      <Route path="/decks/:deckId" element={<Practice />} />
      <Route path="/decksList" element={<DeckList/>}/>
    </Routes>
  )
}


export default App











// import { useState } from 'react'
// import hamburgerIcon from './assets/hamburgerIcon.svg'
// import './App.css';
// import DeckSettings from './pages/DeckSettings';
// import { Link } from "react-router-dom";
// import { useNavigate, redirect, Routes, Route } from "react-router-dom";
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'

// type Card = {
//   front: string;
//   back: string;
// }



// type AddCardFormProps = {
//   onAdd: (card: Card) => void;
// };

// const cardsExample: Card[] = [
//   {
//     front: "dom",
//     back: "house"
//   }, 
//   {
//     front: "kot",
//     back: "cat"
//   }, 
//   {
//     front: "pies",
//     back: "dog"
//   }, 
// ]
// function DisplayDeck({cards}: {cards: Card[]}){

//   return(<table>
//   <thead>
//     <tr>
//       <th>Front</th>
//       <th>Back</th>
//     </tr>
//   </thead>

//   <tbody>
//     {cards.map((card, index) => (
//       <tr key={index}>
//         <td>{card.front}</td>
//         <td>{card.back}</td>
//       </tr>
//     ))}
//   </tbody>
// </table>);
  
  
// }


// function AddCardForm({onAdd}: AddCardFormProps){
//   const [front, setFront] = useState('');
//   const [back, setBack] = useState('');
  


//   function handleSubmit(e: React.FormEvent<HTMLFormElement>){
//     e.preventDefault();

//     onAdd({front,back});
//     setFront('');
//     setBack('');

//   }
//     return(
//       <div>
//         <form onSubmit={handleSubmit}>
//           <h2>Add a Card</h2>

//           <input placeholder="Front" value={front} onChange={(e) => setFront(e.target.value)}></input>
//           <input placeholder="Back" value={back} onChange={(e) => setBack(e.target.value)}></input>

//           <button type="submit">Add</button>

//         </form>
//       </div>
//     );

//   }
//   function IconMenu(){
//     const [showMenu, setShowMenu] = useState(false);

//     function handleShowMenu(){
//       setShowMenu(!showMenu);
//     }

//     function MenuDisplay(){
//       return (
//         <div className="menuDisplay">
//           <p>Menu</p>
//         </div>

//       );
//     }

//     return(
//       <div>
//         <button id="hamburgerButton" onClick={handleShowMenu}><img src={hamburgerIcon} alt="Drop down Menu"></img></button>
//         {showMenu && <MenuDisplay />}
//       </div>
//     )
//   }

//   function EditDeck(){
//     return(

//       <button>Edit Deck</button>


//     )
//   }

// function CardTraining(){
//   const [cards, setCards] = useState<Card[]>([{front: "", back: ""}]);
//   const [index, setIndex] = useState(0);
//   const [flipCard, setFlipCard] = useState(false);
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [showTable, setShowTable] = useState(false);
//   const hasNext = index < cards.length - 1;

//   function handleFlipCard() {
//     setFlipCard(!flipCard);
//   }

//   function handleShowAddForm(){
//     setShowAddForm(!showAddForm);
//   }

//   function handleShowTable(){
//     setShowTable(!showTable);
//   }

//   function handleNextClick() {
//     if (hasNext) {
//       setIndex(index + 1);
//       setFlipCard(false);

//     } else {
//       setIndex(0);
//       setFlipCard(false);
//     }
//   }
//   function addCard(card: Card){
//   setCards(prev => [...prev, card]);
//   }

  


//   let frontCard = cards[index].front;
//   let backCard = cards[index].back;

//   return (
//     <div>
//       <div className="mainBody">
//       <div className="topMargin">
//         <p></p>
//         <p>Flash Card App</p>
//         <div className="menuContainer"><IconMenu/></div>
//         </div>
//       <button onClick={handleNextClick}> Next </button>
//       <h2>
//         <p>{flipCard ? backCard : frontCard}</p>
//       </h2>
//       <button onClick={handleFlipCard}> Flip </button>
//       <h3>Card {index + 1 } of {cards.length}</h3>
//       <button onClick={handleShowAddForm}> Add a card </button>
//       {showAddForm && <AddCardForm onAdd={addCard} />}
//       <button onClick={handleShowTable}> Show Deck </button>
//       {showTable && <DisplayDeck cards={cards} />}
      
//       </div>
      

//     </div>
//   );

  
// }


