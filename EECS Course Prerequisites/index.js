const findPrereq = () => {
  let prerequisite = document.getElementById("course-number").value;
  let courses = [
    "LE/EECS 1021",
    "LE/EECS 1022",
    "LE/EECS 1023",
    "LE/EECS 1024",
    "LE/EECS 1025",
    "LE/EECS 1026",
  ];

  if (prerequisite.length === 4) {

    let ul = document.getElementById("dynamic-list"); //Get the unordered list we want to manipulate.
    
    ul.querySelectorAll('*').forEach(n => n.remove()); //Remove all the current list items.
    

    //Add courses
    courses.forEach((course) => {
      
      let li = document.createElement("li");
      li.setAttribute("id", prerequisite);
      li.appendChild(document.createTextNode(course));
      ul.appendChild(li);
    });

    //Reset textbox after operations have been preformed
    document.getElementById("course-number").value = "";
  } else {
    console.log("The course code must be 4 digits in length");
  }
};
