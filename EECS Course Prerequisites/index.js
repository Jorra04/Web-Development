const findPrereq = async () => {
  let course_code = document.getElementById("course-number").value;
  let course_faculty = document.getElementById("faculties").value;
  let courses = [];
  let refined_course_faculty = course_faculty.replace("/", "%2f").trim();
  let response_received = false;
  if (course_code.length === 4) {
    try {
      const resp = await axios.get(
        `http://yorkapi-env.eba-fi5ekpb4.us-east-2.elasticbeanstalk.com/prerequisites/coursesRequired/${refined_course_faculty}/${course_code}`
      );

      courses = resp.data.courses;

      response_received = typeof courses != typeof undefined;

      document.getElementById(
        "your-courses-header"
      ).innerHTML = `Found Prerequistes for ${course_faculty} ${course_code}`;
    } catch (err) {
      document.getElementById(
        "your-courses-header"
      ).innerHTML = `"${course_faculty} ${course_code}" is either not recognized by this program or does not exist!`;
    }

    if (response_received) {
      let ul = document.getElementById("dynamic-list"); //Get the unordered list we want to manipulate.

      ul.querySelectorAll("*").forEach((n) => n.remove()); //Remove all the current list items.
      if (courses.length == 0) {
        document.getElementById(
          "your-courses-header"
        ).innerHTML = `"${course_faculty} ${course_code}" does not have any prerequisites.`;
      } else {
        //Add courses
        courses.forEach((course) => {
          let li = document.createElement("li");
          li.setAttribute("id", course_code);
          li.appendChild(document.createTextNode(course));
          ul.appendChild(li);
        });
      }

    } else {
      document.getElementById(
        "your-courses-header"
      ).innerHTML = `"${course_faculty} ${course_code}" is either not recognized by this program or does not exist!`;
    }

    //Reset textbox after operations have been preformed
    document.getElementById("course-number").value = "";
  } else {
    alert(`The Course Code needs to be exactly 4 digits in length.`);
  }
};




const findPostreq = async () => {
  let course_code = document.getElementById("course-number").value;
  let course_faculty = document.getElementById("faculties").value;
  let courses = [];
  let refined_course_faculty = course_faculty.replace("/", "%2f").trim();
  let response_received = false;
  if (course_code.length === 4) {
    try {
      const resp = await axios.get(
        `http://yorkapi-env.eba-fi5ekpb4.us-east-2.elasticbeanstalk.com/prerequisites/coursesRequiring/${refined_course_faculty}/${course_code}`
      );

      courses = resp.data.courses;

      response_received = typeof courses != typeof undefined;

      document.getElementById(
        "your-courses-header"
      ).innerHTML = `Found Prerequistes for ${course_faculty} ${course_code}`;
    } catch (err) {
      document.getElementById(
        "your-courses-header"
      ).innerHTML = `"${course_faculty} ${course_code}" is either not recognized by this program or does not exist!`;
    }

    if (response_received) {
      let ul = document.getElementById("dynamic-list"); //Get the unordered list we want to manipulate.

      ul.querySelectorAll("*").forEach((n) => n.remove()); //Remove all the current list items.
      if (courses.length == 0) {
        document.getElementById(
          "your-courses-header"
        ).innerHTML = `No courses require the following course: ${course_faculty} ${course_code}.`;
      } else {
        //Add courses
        courses.forEach((course) => {
          let li = document.createElement("li");
          li.setAttribute("id", course_code);
          li.appendChild(document.createTextNode(course));
          ul.appendChild(li);
        });
      }
    } else {
      document.getElementById(
        "your-courses-header"
      ).innerHTML = `"${course_faculty} ${course_code}" is either not recognized by this program or does not exist!`;
    }

    //Reset textbox after operations have been preformed
    document.getElementById("course-number").value = "";
  } else {
    alert(`The Course Code needs to be exactly 4 digits in length.`);
  }
};
