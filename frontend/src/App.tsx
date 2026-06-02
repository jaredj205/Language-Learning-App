import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'



type Card = {
  front: string;
  back: string;
}
type AddCardFormProps = {
  onAdd: (card: Card) => void;
};

const cards: Card[] = [
  {
    front: "dom",
    back: "house"
  }, 
  {
    front: "kot",
    back: "cat"
  }, 
  {
    front: "pies",
    back: "dog"
  }, 
]
function displayDeck(){
  
}

function addCard(card: Card){
  cards.push(card);
}
function AddCardForm({onAdd}: AddCardFormProps){
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');



  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    onAdd({front,back});
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
    )

  }
function CardTraining(){
  const [index, setIndex] = useState(0);
  const [flipCard, setFlipCard] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const hasNext = index < cards.length - 1;

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
      setFlipCard(false);

    } else {
      setIndex(0);
      setFlipCard(false);
    }
  }

  function handleFlipCard() {
    setFlipCard(!flipCard);
  }

  function handleShowAddForm(){
    setShowAddForm(!showAddForm);
  }


  let frontCard = cards[index].front;
  let backCard = cards[index].back;

  return (
    <div>
      <button onClick={handleNextClick}> Next </button>
      <h2>
        <p>{flipCard ? backCard : frontCard}</p>
      </h2>
      <button onClick={handleFlipCard}> Flip </button>
      <h3>Card {index + 1 } of {cards.length}</h3>
      <button onClick={handleShowAddForm}> Add a card </button>
      {showAddForm && <AddCardForm onAdd={addCard} />}

    </div>
  );

  
}

/*function App() {
  



  return (
    <div>
    <h1>FlashCards</h1>
    <p>This site is designed to be used for memorizing cards for any use case.</p>
    
    <button>Click here for more</button>
    </div>
  )
} */

export default CardTraining
