const axios = require("axios");
const prompt = require("prompt-sync")({ sigint: true });

/**
 * Function that causes program to halt. Different from setTimeout as
 * setTimeout is non blocking, but via asynchronous code we can use await
 * to stop the run of the code for a specified amount of time.
 * @param {Number} ms Number of Miliseconds to sleep for.
 * @returns {Promise} The promise to be resolved after the timeout is done.
 */
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Function to check if ace should be treated as high or low
 * @param {Number} players_current_value The player's current value which will be used
 * to determine how the ace should be treated.
 * @returns {Number} The number that the function determines should be added to the current value.
 */
const aceHighOrLow = (players_current_value) => {
    if (Number(players_current_value) + 11 > 21) {
        return 1;
    }
    return 11;
};

/**
 * Function to check if the the card is a face card.
 * @param {String} card The string representation of the card.
 * @returns {boolean} returns true if the card is a face card and false if not. 
 */
const isFaceCard = (card) => {
    return (
        card.value === "JACK" || card.value === "QUEEN" || card.value === "KING"
    );
};


/**
 * Convert the value of a card
 * @param {String} card The string representation of the card.
 * @param {Number} player_current_score The player's current value which will be passed
 * to the aceHighOrLow() to determine how the Ace will be treated.
 * @returns the numerical representation of the card passed.
 */
const getCardValue = (card,  player_current_score = 0) => {
    let players_current_value = 0;
    if (isFaceCard(card)) {
        players_current_value += 10;
    } else if (card.value === "ACE") {
        players_current_value += aceHighOrLow(player_current_score);
    } else {
        // console.log(card.value);
        players_current_value += Number(card.value);
    }
    // console.log(`getCardValue returned ${players_current_value}`);
    return players_current_value;
}

/**
 * Convert the value of an array of cards
 * @param {Array} cards An array of cards. 
 * @param {*} player_current_score  The player's current value which will be passed
 * to the getCardValue() to determine how the Ace will be treated.
 * @returns the numerical representation of the cards passed.
 */
const getValues = (cards, player_current_score = 0) => {
    let players_current_value = 0;
    cards.forEach((card) => {
        players_current_value += getCardValue(card, player_current_score)
    });
    // console.log(`getValues returned ${players_current_value}`);
    return players_current_value;
};

/**
 * Responsible for getting the deckID and dealing the first two cards to each player
 * @returns JSON Object which has all the essential attributes of the startup
 * 
 * deck_id
 * players_cards
 * player_blackjack
 * dealers_card
 * dealer_blackjack
 */
const start = async () => {
    let dealers_card = [];
    let players_cards = [];

    try {
        const resp = await axios.get(
            "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6"
        );
        const deckID = resp.data.deck_id;
        const firstDealtResp = await axios.get(
            `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=4`
        );
        players_cards = [
            firstDealtResp.data.cards[0],
            firstDealtResp.data.cards[2],
        ];
        dealers_card = [firstDealtResp.data.cards[1], firstDealtResp.data.cards[3]];

        let player_blackjack = getValues(players_cards) === 21;
        let dealer_blackjack = getValues(dealers_card) === 21;

        return {
            deck_id: deckID,
            players_cards: players_cards,
            player_blackjack: player_blackjack,
            dealers_card: dealers_card,
            dealer_blackjack: dealer_blackjack,
        };
    } catch (err) {
        console.log(err.message);
    }
};


/**
 * This function deals 1 card to the caller.
 * @param {String} deck_identifier A string code recieved by the API on start up. Responsible
 * for keeping track of which deck(s) we are dealing from.
 * @param {Number} player_current_score The player's current value which will be passed to
 * different susequet functions that this function invokes.
 * @returns Returns the value of the card dealt.
 */
const dealCards = async (deck_identifier, player_current_score=0) => {
    const dealtCardsResp = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deck_identifier}/draw/?count=1`
    );

    // console.log(dealtCardsResp.data.cards);
    // console.log(`dealCards returned ${getValues(dealtCardsResp.data.cards,player_current_score)}`);
    return getValues(dealtCardsResp.data.cards,player_current_score);
};


/**
 * A function that allows input to be gathered with different text prompts.
 * @param {String} text A String which will prompt the user with whatever value it is passed. 
 * @returns a boolean. True if the received response deems a continuation, and false if it does not.
 */

const getInput = (text) => {
    let guess = prompt(text);

    if (guess === "y" || guess === "Y") {
        return true;
    }
    return false;
};

/**
 * A function to determine if the dealer won or the player won.
 * @param {Number} player_score A number which keeps track of the player's current score.
 * @param {boolean} player_bust A boolean which is true if the player has busted and false if the
 * player has not.
 * @param {Number} dealer_score A number which keeps track of the dealer's current score.
 * @param {boolean} dealer_bust A boolean which is true if the dealer has busted and false if the
 * dealer has not.
 * @returns A string which represents the state of the game based on the below logic.
 */
const getWinner = (player_score, player_bust, dealer_score, dealer_bust) => {

    if (player_bust) {
        return (
            `You've gone bust! The house wins this hand.\n` +
            `Dealer Score: ${dealer_score}\n` +
            `Player Score: ${player_score}\n`
        );
    } else if (dealer_bust) {
        return (
            `Congratulations, you win! The Dealer has gone bust!\n` +
            `Dealer Score: ${dealer_score}\n` +
            `Player Score: ${player_score}\n`
        );
    } else {
        if (player_score > dealer_score) {
            return (
                `Congratulations, you've beaten the dealer!\n` +
                `Your Score: ${player_score}\n` +
                `Dealer's Score: ${dealer_score}\n`
            );
        } else if (player_score < dealer_score) {
            return (
                `The house wins! You've been beaten by the dealer!\n` +
                `Your Score: ${player_score}\n` +
                `Dealer's Score: ${dealer_score}\n`
            );
        } else {
            return (
                `It's a push! The dealer and yourself have the same value.\n` +
                `Your Score: ${player_score}\n` +
                `Dealer's Score: ${dealer_score}\n`
            );
        }
    }
};

start()
    .then(async (deck_information) => {
        if (
            deck_information.player_blackjack &&
            deck_information.dealer_blackjack
        ) {
            console.log("Push! You and the Dealer both have BlackJack.");
        } else if (deck_information.player_blackjack) {
            console.log("Congratulations! You have BlackJack.");
        } else if (deck_information.dealer_blackjack) {
            console.log("The dealer has BlackJack.");
        } else {
            let player_score = getValues(deck_information.players_cards);
            let dealer_score = getCardValue(deck_information.dealers_card[0]); //Only want to see the first card the dealer has.
            // console.log(deck_information.dealers_card);
            let player_bust = false;
            let dealer_bust = false;
            let player_blackjack = false;
            let dealer_blackjack = false;
            while (
                getInput(
                    `You currently have ${player_score} and the dealer has ${dealer_score}. Would you like to hit? `
                )
            ) {
                try {
                    const addedVal = await dealCards(deck_information.deck_id, player_score);
                    console.log(`You drew a card with a value of ${addedVal}`);
                    player_score += addedVal;
                    if (player_score > 21) {
                        console.log(`You have gone bust!`);
                        player_bust = true;
                        break;
                    } else if (player_score === 21) {
                        console.log("Congratulations! You have BlackJack.");
                        player_blackjack = true;
                        break;
                    }
                } catch (err) {
                    console.log(err.message);
                }
            }

            console.log("dealer is hitting now");
            dealer_score += getCardValue(deck_information.dealers_card[1]);
            console.log(`After the flip ${dealer_score}`);
            while (dealer_score < 17) {

                try {
                    const addedVal = await dealCards(deck_information.deck_id, dealer_score);
                    await sleep(3000);
                    console.log(`The Dealer drew a card with a value of ${addedVal}`);
                    dealer_score += addedVal;
                    console.log(`The Dealer has ${dealer_score}.`);
                    
                    if (dealer_score > 21) {
                        console.log(`Dealer has gone bust!`);
                        dealer_bust = true;
                        break;
                    } else if (dealer_score === 21) {
                        console.log("The dealer has BlackJack.");
                        player_blackjack = true;
                        break;
                    }
                    console.log('here');

                } catch (err) {
                    console.log(err.message);
                }
            }

            if (!(player_blackjack || dealer_blackjack)) {
                console.log(
                    getWinner(player_score, player_bust, dealer_score, dealer_bust)
                );
            }
        }
    })
    .catch((err) => {
        console.log(err.message);
    });
