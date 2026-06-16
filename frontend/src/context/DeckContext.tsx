import { createContext, useContext, useEffect, useState, type ReactNode, } from "react";
import { type Deck } from "../types/Deck";
import { type Card } from "../types/Card";

export type DeckContextType = {
  decks: Deck[];
  
  addDeck: (name: string) => void;
  deleteDeck: (id: string) => void;
  addCard: (id: string, card: Card) => void;
  deleteCard: (id: string, cardId: string) => void;
  setDecks: React.Dispatch<React.SetStateAction<Deck[]>>;

};

const DeckContext = createContext<DeckContextType | null>(null);

//Need this to render anything below deckcontext in app.tsx
type DeckProviderProps = {
    children: ReactNode;
}


export function DeckProvider({children}: DeckProviderProps){
    const [decks, setDecks] = useState<Deck[]>([]);

    function addDeck(name: string){
    setDecks(prev => [...prev, {id: crypto.randomUUID() , name, cards: []}])
    }

    function deleteDeck(id: string){
        setDecks(prev => prev.filter(deck => deck.id !== id));
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



    //useEffect runs the function on startup
    useEffect(() => {
        const savedDecks = localStorage.getItem("decks");
        if (savedDecks){
            setDecks(JSON.parse(savedDecks));

        }

    }, []);

    //This useEffect alters the saved data of decks whenever it is altered. Runs the return first then the function
    useEffect(() => {
        localStorage.setItem("decks", JSON.stringify(decks));
    }, [decks]);

    return(
        <DeckContext.Provider value={{decks, addDeck, deleteDeck, addCard, deleteCard, setDecks}}>{children}</DeckContext.Provider>
    );
    
}

export function useDeck() {
    const context = useContext(DeckContext);

    if (!context) {
        throw new Error("useDeck must be used inside a DeckProvider");
    }

    return context;
}