import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import home from "./pages/home/home";
import login from "./pages/login/login";
import signup from "./pages/signup/signup";
import { events } from "./pages/events/events";
import ISD from "./pages/InsightSheet/insightsheet";
import ISDetail from "./pages/InsightSheet/insightsheetdetail";



const App: React.FC = () => {

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/' component={home} />
          <Route exact path='/login' component={login} />
          <Route exact path='/signup' component={signup} />
          <Route exact path='/events' component={events} />
          <Route exact path='/insightsheet' component={ISD} />
          <Route exact path='/insightsheetdetail' component={ISDetail} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
