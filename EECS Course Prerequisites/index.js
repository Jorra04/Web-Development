const findPrereq = () => {
    let prerequisite = document.getElementById("course-number").value;

    if(prerequisite.length === 4){
        console.log('acceptable');
    } else {
        console.log('The course code must be 4 digits in length');
    }

}