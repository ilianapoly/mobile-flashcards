import { AsyncStorage } from "react-native";
import { getInitialData } from "./_DATA";


const DECKS_STORAGE_KEY = "MobileFlashCards:Decks";

export async function getDecks() {

    let data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    if(data === null){

        await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(getInitialData()));
        data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);
    }

    return JSON.parse(data);
}

export async function saveDeckTitle ( deckTitle ) {

    await AsyncStorage.mergeItem( DECKS_STORAGE_KEY, JSON.stringify(deckTitle) );
}

export async function addCardToDeck( deckTitle, newCard ) {

    const data = await AsyncStorage.getItem(DECKS_STORAGE_KEY);

    const allDecks = JSON.parse(data);

    allDecks[deckTitle] = {
        ...allDecks[deckTitle],
        questions: [...allDecks[deckTitle].questions, newCard]
    };

    await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(allDecks));
 }