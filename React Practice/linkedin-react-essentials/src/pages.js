import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div>
      <h1>Comapny Website</h1>
      <nav>
        <Link to="About">About</Link>
        <Link to="Events">Events</Link>
        <Link to="Contact">Contact</Link>
      </nav>
    </div>
  );
}

export function About() {
  return (
    <div>
      <h1>About</h1>
    </div>
  );
}

export function Services() {
  return (
    <div>
      <h2>Our Services</h2>
    </div>
  );
}


export function CompanyHistory() {
    return (
      <div>
        <h2>Our Company History</h2>
      </div>
    );
  }


  export function Location() {
    return (
      <div>
        <h2>Our Location</h2>
      </div>
    );
  }

export function Events() {
  return (
    <div>
      <h1>Events</h1>
    </div>
  );
}

export function Contact() {
  return (
    <div>
      <h1>Contact</h1>
    </div>
  );
}

export function Whoops404() {
  return (
    <div>
      <h1>This route does not exist.</h1>
    </div>
  );
}
