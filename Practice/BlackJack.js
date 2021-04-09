const axios = require('axios');
const prompt = require('prompt-sync')({ sigint: true });


let deckID = '';
let current_value = 0;
const start = async () => {
    try {
        const resp = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=6');
        return resp.data.deck_id;

    } catch (err) {
        console.log(err.message);
    }
}

const deal = async (deck_id, first_hand) => {
    let card = '';
    try {
        if (first_hand) {
            const resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=2`);
            card = resp.data.cards;
        }
        else {
            const resp = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`);

            card = resp.data.cards;
        }

        return card;


    } catch (err) {
        console.log(err);
    }
}


start()
    .then(deck_id => {

        deal(deck_id, true)
            .then(cards => {
                cards.forEach(card => {
                    console.log(card.value + " of " + card.suit);
                });
            })
            .catch(err => {
                console.log(err.message);
            })
            .then(() => {
                let i = 0;

                while (i < 5) {
                    deal(deck_id, false)
                        .then(cards => {
                            cards.forEach(card => {
                                console.log(card.value + " of " + card.suit);
                            });
                        })
                        .catch(err => {
                            console.log(err.message);
                        })
                    i++;
                }
            })
    })
    .catch(err => {
        console.log(err.message);
    })