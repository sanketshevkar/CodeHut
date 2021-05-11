import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
//Components
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Hut from './components/Hut';

function App() {
  return (
    <div>
      <Router>
      <Navbar />
        <Route exact path="/" component={Landing} />
        <Route exact path="/hut" component={Hut} />
      </Router>
    </div>
  );
}

export default App;