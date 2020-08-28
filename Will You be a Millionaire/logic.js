var nums = 0;
function clickMe(){
    var name = document.getElementById("name").value;
    if(name.length > 0) {
        var survival_rate = Math.random() *101;
        if(survival_rate >=50){
            document.getElementById("header").innerHTML = name + ", you are not a millionaire.";
        }
        else{
            document.getElementById("header").innerHTML = name + ", you are a millionaire!";
        }
        
    }
    
}


function enter_pressed(){
    
    document.getElementById("header").innerHTML = ++nums;
}