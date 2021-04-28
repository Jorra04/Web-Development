import React from "react"
import './App.css';
import krustyKrabLogo from './RestaurantLogo.png'



function Header(props) {
  return (
    <header>
      <h1>{props.name} Presents..<br/></h1>
    </header>
  )
}
const convertDates = (date_index) =>{
  let days_of_week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]

  return days_of_week[date_index];

}


const convertMonths = (month_index) => {
  let months_of_year = [
    "January",
    "February",
    "March",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ]


  return months_of_year[month_index];
}

const Main = (props) => {
  return (
    <section>
    <p>
      This is where we tell you about our {props.adjective} menu!
    </p>
    <img src={krustyKrabLogo} height={200} alt="Krusty Krab Pizza Logo"/>
    <ul style={{textAlign : "left"}}>
      {props.dishes.map((dish)=> (
        <li key={dish.id}>{dish.title}</li>
      ))}
    </ul>
  </section>
  );
}


function Footer(props) {
  return (
    <footer>
      <h3>
        {convertDates(props.day)} {convertMonths(props.month)} {props.date} {props.year}
      </h3>
    </footer>
  )
}



const dishes = [
  "Pizza",
  "Fries",
  "Steak",
  "Wings"
];

const dishOBJ = dishes.map((dish,i)=>(
  {
    id : i,
    title : dish
  }
));


function App() {
  let date = new Date();
  return (
    <div className="App">
      <Header name="Eugene"/>
      <Main adjective="Mouth Watering" dishes={dishOBJ} />
      <Footer 
      day={date.getDay()}
      month = {date.getMonth()}
      date = {date.getDate()}
      year = {date.getFullYear()}
      />
    </div>
  );
}

export default App;
