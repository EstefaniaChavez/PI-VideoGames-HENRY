import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home';
import VideogameCreate from './components/VideogameCreate';
import Detail from './components/Details';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/videogames' component={VideogameCreate}/>
          <Route path='/videogames/:id' render={({ match }) => <Detail id={match.params.id}/>}/>
        </Switch> 
      </div>
    </BrowserRouter>
  );
}

export default App;
