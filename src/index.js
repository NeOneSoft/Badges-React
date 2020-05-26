import React from 'react';         // Analogo a create element
import ReactDOM from 'react-dom';  // Anlogo a appenChild
import './global.css';
import 'bootstrap/dist/css/bootstrap.css';


//import Badge from './components/Badge'
//import BadgeNew from './pages/BadgeNew'
//import Badges from './pages/Badges';
import App from './components/App';// Importamos este componente para agregar las rutas


const container = document.getElementById('app');

// ReactDOM.render(__qué__, __dónde__);
ReactDOM.render(<App />, container);
