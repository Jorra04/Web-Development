const axios = require('axios');
const prompt = require('prompt-sync')({ sigint: true });

//Function to check if ace should be treated as high or low
const aceHighOrLow = (players_current_value) => {
    if(Number(players_current_value) + 11 > 21) {
        return 1;
    }
    return 11;
}

//function to check if the the card is a face card.
const isFaceCard = (card) =>{
  
    return (
        card.value === 'JACK' ||
        card.value === 'QUEEN' ||
        card.value === 'KING'
    );
}

//Convert the value of the cards
const getValues = (cards) => {
    let players_current_value = 0;
    cards.forEach(card => {
        
        if(isFaceCard(card)){
            players_current_value += 10;
        }
        else if(card.value === 'ACE'){
            players_current_value += aceHighOrLow(players_current_value);
        }
        else {
            // console.log(card.value);
            players_current_value += Number(card.value);
        }
    });

    return players_current_value;
}


//Start and deal the first two cards
const start = async () => {
    let dealers_card = [];
    let players_cards = [];
    
    try {
        const resp = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6');
        const deckID = resp.data.deck_id;
        const firstDealtResp = await axios.get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`);
        players_cards = [firstDealtResp.data.cards[0], firstDealtResp.data.cards[2]];
        dealers_card = [firstDealtResp.data.cards[1], firstDealtResp.data.cards[3]]

        let player_blackjack = getValues(players_cards) === 21;
        let dealer_blackjack = getValues(dealers_card) === 21;

        return ({
            deck_id : deckID,
            players_cards : players_cards,
            player_blackjack : player_blackjack,
            dealers_card : dealers_card,
            dealer_blackjack : dealer_blackjack

        });

    } catch (err) {
        console.log(err.message);
    }
}

const getInput = async () => {
    let guess = prompt("Enter a value: ");

    return guess;

}


start()
.then((deck_information) => {
    console.log(deck_information);
    // console.log("====== value ======");
    // console.log(getValues(deck_information.first_dealt));
})














// let deckID = '';
// let current_value = 0;
// const start = async () => {
//     try {
//         const resp = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6');
//         return resp.data.deck_id;

//     } catch (err) {
//         console.log(err.message);
//     }
// }

// const deal = async (deck_id, first_hand) => {
//     let card = '';
//     try {
//         if (first_hand) {
//             const resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`);
//             card = resp.data.cards;
//         }
//         else {
//             const resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);

//             card = resp.data.cards;
//         }

//         return card;


//     } catch (err) {
//         console.log(err);
//     }
// }


// const deck_identifier = start();

// console.log(deck_identifier);


/*
This code works, however, it is an example of callback hell.
Need to find a better way to write this with async and await.
*/

// start()
//     .then(deck_id => {

//         deal(deck_id, true)
//             .then(cards => {
//                 cards.forEach(card => {
//                     console.log(card.value + " of " + card.suit);
//                 });
//             })
//             .catch(err => {
//                 console.log(err.message);
//             })
//             .then(() => {
//                 let i = 0;

//                 while (i < 5) {
//                     deal(deck_id, false)
//                         .then(cards => {
//                             cards.forEach(card => {
//                                 console.log(card.value + " of " + card.suit);
//                             });
//                         })
//                         .catch(err => {
//                             console.log(err.message);
//                         })
//                     i++;
//                 }
//             })
//     })
//     .catch(err => {
//         console.log(err.message);
//     })