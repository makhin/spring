import React, {Component} from 'react';
import './App.css';
import Routes from "./Routes";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import {Container} from "reactstrap";

class App extends React.Component {
  render() {
    return (
        <div>
            <Navigation/>
            <Container>
                <Routes/>
            </Container>
            <Footer/>
        </div>
    );
  }
}

export default App;
