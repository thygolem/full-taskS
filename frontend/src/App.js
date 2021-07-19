import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import {HoodSG} from './components/HoodSG'
import {Users} from './components/Users'
import {Navbar} from './components/Navbar'



function App() {
  return (
  <Router>
    <Navbar/>
    <div className="container" p-2>
      <Switch>
        <Route path="/hoodsg" component={HoodSG}/>
        <Route path="/" component={Users}/>

      </Switch>


    </div>
  </Router>
  );
}

export default App;
