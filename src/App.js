import React from 'react';
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'
import Chapter from './components/Chapter'
import Home from "./components/Home"
import Story from './components/Story'
import NotFound from './components/layouts/NotFound'
import './App.css';

function App() {
  
  return (
    <div className="App bg ">
      {/* <Storie title="JahimAlJannah" chapter="1" /> */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/story/:story" component={Story} /> 
          <Route exact path="/chapter/:story/:chapter" component={Chapter} />
          <Route exact path="/404" component={NotFound} />
          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
