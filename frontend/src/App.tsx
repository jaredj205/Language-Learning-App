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
  const [showMore, setShowMore] = useState(false);
  const hasNext = index < cards.length - 1;

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
      setShowMore(false);

    } else {
      setIndex(0);
      setShowMore(false);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }


  let frontCard = cards[index].front;
  let backCard = cards[index].back;

  return (
    <div>
      <button onClick={handleNextClick}> Next </button>
      <h2>
        <p>{showMore ? backCard : frontCard}</p>
      </h2>
      <button onClick={handleMoreClick}> Flip </button>
      <h3>Card {index + 1 } of {cards.length}</h3>
      <AddCardForm onAdd={addCard} />

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
