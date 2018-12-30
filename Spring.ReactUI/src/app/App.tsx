import React, {Component} from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import Routes from "./Routes";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import {Container} from "reactstrap";

class App extends React.Component {
  render() {
    return (
        <div>
            <Navigation/>
            <Container>
                <Header/>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/cities">Cities</Link></li>
                </ul>
                <Routes/>
            </Container>
            <Footer/>
        </div>
    );
  }
}

export default App;
