import { createContext, useContext, useEffect, useState, type ReactNode, } from "react";
import { type Deck } from "../types/Deck";
import { type Card } from "../types/Card";

export type DeckContextType = {
  decks: Deck[];
  shuffleMode:boolean;
  handleShuffleMode:() => void;
  addDeck: (name: string) => void;
  deleteDeck: (id: string) => void;
  editDeck: (id: string, newName: string) => void;
  addCard: (id: string, card: Card) => void;
  deleteCard: (id: string, cardId: string) => void;
  editCard: (id: string, card: Card) => void;
  setDecks: React.Dispatch<React.SetStateAction<Deck[]>>;

};

const DeckContext = createContext<DeckContextType | null>(null);

//Need this to render anything below deckcontext in app.tsx
type DeckProviderProps = {
    children: ReactNode;
}


export function DeckProvider({children}: DeckProviderProps){
    const [decks, setDecks] = useState<Deck[]>([]);
    const [shuffleMode, setShuffleMode] = useState(false);

    const loadDecks = async () => {
    console.log("Loading decks");
    const response = await fetch("http://localhost:5165/api/decks");
    const data = await response.json();

    console.log(data);

    setDecks(data);
  };

  const addDeck = async (name: string) => {
    console.log("Creating deck");
    const deck = {name, cards: []};
    const response = await fetch("http://localhost:5165/api/decks", 
        {method: "POST", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(deck)});
    const data = await response.json();

    console.log(data);

    await loadDecks();
  };

  const deleteDeck = async (id: string) => {
    console.log("Removing deck");
    const response = await fetch(`http://localhost:5165/api/decks/${id}`, 
        {method: "DELETE"});
    const data = await response.json();

    console.log(data);

    await loadDecks();
  };

  const editDeck = async (id: string, newName: string) => {
    console.log("Editing deck");
    const deck = {name:newName}
    const response = await fetch(`http://localhost:5165/api/decks/${id}`, 
        {method: "PUT", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(deck)});
    const data = await response.json();

    console.log(data);

    await loadDecks();
  };


  //FIX THIS -- Does not work properly
  const addCard = async (id: string, card: Card) => {
    console.log("Adding card");
    const deck = decks.find(d => d.id === id);
    if (!deck) {
        console.log("Deck not found");
        return;
    }
    const newDeck = addCardToDeck(deck, card);
    const response = await fetch(`http://localhost:5165/api/decks/${id}`, 
        {method: "PUT", 
        headers: {"Content-Type": "application/json"}, 
        body: JSON.stringify(newDeck)});
    const data = await response.json();

    console.log(await response.text());

    await loadDecks();
  };


  

    

  

    function handleShuffleMode(){
    setShuffleMode(!shuffleMode);
  }

  

    // function addDeck(name: string){
    // setDecks(prev => [...prev, {id: crypto.randomUUID() , name, cards: []}])
    // }

    // function deleteDeck(id: string){
    //     setDecks(prev => prev.filter(deck => deck.id !== id));
    // }

//     function editDeck(deckId: string, newName: string) {
//     setDecks(prev =>
//         prev.map(deck => {
//             if (deck.id !== deckId) {
//                 return deck;
//             }

//             return {
//                 ...deck,
//                 name: newName
//             };
//         }));
// }
    
    function addCardToDeck(deck: Deck, card: Card){
            return{
                ...deck, cards:[...deck.cards, card]
            };
    };

    

    

    function deleteCard(id: string, cardId: string){
        setDecks(prev => prev.map(deck => {
        if(deck.id !== id){
        return deck;
      }
      return {
        ...deck, cards: deck.cards.filter(c => c.id !== cardId)
      };
      })
    );
    }

    function editCard(id: string, alteredCard: Card){
        setDecks(prev => prev.map(deck => {
            if(deck.id !== id){
                return deck;
            }
            return{
                ...deck, cards:deck.cards.map(card => {
                    if (card.id !== alteredCard.id){
                        return card;
                    }
                    return alteredCard;
                })
            };
    }));

    }

    useEffect(() => {
    loadDecks();
}, []);


    //useEffect runs the function on startup
    // useEffect(() => {
    //     const savedDecks = localStorage.getItem("decks");
    //     if (savedDecks){
    //         setDecks(JSON.parse(savedDecks));

    //     }

    // }, []);

    // //This useEffect alters the saved data of decks whenever it is altered. Runs the return first then the function
    // useEffect(() => {
    //     localStorage.setItem("decks", JSON.stringify(decks));
    // }, [decks]);

    return(
        <DeckContext.Provider value={{shuffleMode, decks, handleShuffleMode, addDeck, deleteDeck, editDeck, addCard, deleteCard, editCard, setDecks}}>{children}</DeckContext.Provider>
    );
    
}

export function useDeck() {
    const context = useContext(DeckContext);

    if (!context) {
        throw new Error("useDeck must be used inside a DeckProvider");
    }

    return context;
}