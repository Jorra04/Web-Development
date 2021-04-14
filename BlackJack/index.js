let playerBusted = false;

const deal = async () => {

    if (!playerBusted) {
        let computerScore = document.getElementById('player_score');
        let number = computerScore.innerHTML;
        number = Number.parseInt(number) + 5;
        console.log(number)
        if (number > 21) {
            computerScore.innerHTML = "You've Busted!";
            playerBusted = true;
        }
        else {
            computerScore.innerHTML = number;
        }
    }



}

const stand = () => {
    console.log('standing');

}