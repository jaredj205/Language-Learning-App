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
    const response = await fetch("http://localhost:5165/api/decks");
    const data = await response.json();

    setDecks(data);
  };

  

    function handleShuffleMode(){
    setShuffleMode(!shuffleMode);
  }

    function addDeck(name: string){
    setDecks(prev => [...prev, {id: crypto.randomUUID() , name, cards: []}])
    }

    function deleteDeck(id: string){
        setDecks(prev => prev.filter(deck => deck.id !== id));
    }

    function editDeck(deckId: string, newName: string) {
    setDecks(prev =>
        prev.map(deck => {
            if (deck.id !== deckId) {
                return deck;
            }

            return {
                ...deck,
                name: newName
            };
        }));
}
    
    function addCard(id: string, card: Card){
        setDecks(prev => prev.map(deck => {
            if(deck.id !== id){
                return deck;
            }
            return{
                ...deck, cards:[...deck.cards, card]
            };
    }));

    }

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