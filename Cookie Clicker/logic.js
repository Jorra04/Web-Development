var nums = 0;

var click = new Audio("sounds/ding.mp3");
var reset_button = new Audio("sounds/reset.mp3");
function increment(){
    click.play();
    nums++;
    if(nums == 1){
        document.getElementById("footer").innerHTML = "You've Clicked "+ nums + "  Time!";
    }
    else{
        document.getElementById("footer").innerHTML = "You've Clicked "+ nums + "  Times!";
    }
    
}


function reset(){
    reset_button.play();
    nums = 0;
    document.getElementById("footer").innerHTML = "You've Clicked 0 Times!";
}