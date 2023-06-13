import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';

function App() {
  return (
    <>
      {/* <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
      </Switch>

    </Router> */}

      <Router>
        <Navbar/>  
        <Switch>
          <Route  exact path="/" component={Home}></Route>
          <Route  exact path="/about" component={About}></Route>
        </Switch>
      </Router>




    </>
  );
}

export default App;
