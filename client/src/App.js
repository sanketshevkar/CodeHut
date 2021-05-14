import './App.css';
import {useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
//Components
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Hut from './components/Hut';

function App() {
  const [operation, setOperation] = useState("");
  return (
    <div>
      <Router>
      <Navbar />
        <Route exact path="/" component={()=>Landing({ setOperation })} />
        <Route exact path="/meeting" component={()=>Hut({ operation })} />
      </Router>
    </div>
  );
}

export default App;