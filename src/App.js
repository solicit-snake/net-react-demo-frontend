import logo from './logo.svg';
import './App.css';
import {Home} from './Components/Home';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <h3 className="m-3 d-flex justify-content-center"> React JS Tutorial </h3>
        <Home />
    </div>
  );
}

export default App;
