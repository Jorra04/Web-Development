const axios = require('axios');
const prompt = require('prompt-sync')({ sigint: true });

//Function to check if ace should be treated as high or low
const aceHighOrLow = (players_current_value) => {
    if (Number(players_current_value) + 11 > 21) {
        return 1;
    }
    return 11;
}

//function to check if the the card is a face card.
const isFaceCard = (card) => {

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

        if (isFaceCard(card)) {
            players_current_value += 10;
        }
        else if (card.value === 'ACE') {
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
            deck_id: deckID,
            players_cards: players_cards,
            player_blackjack: player_blackjack,
            dealers_card: dealers_card,
            dealer_blackjack: dealer_blackjack

        });

    } catch (err) {
        console.log(err.message);
    }
}


const dealCards = async (deck_identifier) => {
    const dealtCardsResp = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_identifier}/draw/?count=1`);
    return getValues(dealtCardsResp.data.cards);
}



const getInput = (text) => {
    let guess = prompt(text);

    if (guess === 'y' || guess === 'Y') {

        return true;
    }
    return false;

}

const getWinner = (player_score, dealer_score) => {
    if(player_score > dealer_score){
        return `Congratulations, you've beaten the dealer!\n`+
        `Your Score: ${player_score}\n`+
        `Dealer's Score:${dealer_score}\n`;
    }
    else if (player_score < dealer_score) {
        return `The house wins! You've been beaten by the dealer!\n`+
        `Your Score: ${player_score}\n`+
        `Dealer's Score:${dealer_score}\n`;
    }
    else {
        return `It's a push! The dealer and yourself have the same value.\n` +
        `Your Score: ${player_score}\n`+
        `Dealer's Score:${dealer_score}\n`;
    }
}


start()
    .then(async (deck_information) => {
        if (deck_information.player_blackjack && deck_information.dealer_blackjack) {
            console.log("Push! You and the Dealer both have BlackJack.");
        }
        else if (deck_information.player_blackjack) {
            console.log("Congratulations! You have BlackJack.");
        }
        else if (deck_information.dealer_blackjack) {
            console.log("The dealer has BlackJack.");
        }
        else {
            let player_score = getValues(deck_information.players_cards);
            let dealer_score = getValues(deck_information.dealers_card);
            let player_bust = false;
            let dealer_bust = false;
            while (getInput(`You currently have ${player_score} and the dealer has ${dealer_score}. Would you like to hit? `)) {
                
                try {
                    const addedVal = await dealCards(deck_information.deck_id);
                    player_score+= addedVal;
                    if(player_score > 21){
                        console.log(`You have gone bust!`);
                        player_bust = true;
                        break;
                    }
                    else if(player_score === 21){
                        console.log("Congratulations! You have BlackJack.");
                        break;
                    }
                    
                } catch(err) {
                    console.log(err.message);
                }
            }

            console.log('dealer is hitting now');

            while (dealer_score < 17 && !player_bust) {
                
                try {
                    const addedVal = await dealCards(deck_information.deck_id);
                    dealer_score+= addedVal;
                    if(dealer_score > 21){
                        console.log(`Dealer has gone bust!`);
                        dealer_bust = true;
                        break;
                    }
                    else if(dealer_score === 21){
                        console.log("The dealer has BlackJack.");
                        break;
                    }
                } catch(err) {
                    console.log(err.message);
                }
            }

            if(!(dealer_bust || player_bust)){
                let result = getWinner(player_score, dealer_score);

                console.log(result);
            }
            

        }

    })
    .catch(err => {
        console.log(err.message);
    })