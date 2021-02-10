import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import SideMenu from "./admin/components/SideMenu";
import home from "./pages/home/home";
import login from "./pages/login/login";
import signup from "./pages/signup/signup";
import { events } from "./pages/events/events";
import ISD from "./pages/InsightSheet/insightsheet";
import ISDetail from "./pages/InsightSheet/insightsheetdetail";
import dashboard from "./admin/pages/Dashboard/dashboard";
import login_admin from "./admin/pages/login/login";
import home_admin from "./admin/pages/home/home";
import insightsheet from "./admin/pages/InsightSheets/insightsheet";
import products from "./admin/pages/Products/products";
import CreateInsightSheet from "./admin/components/createInsightSheet";



const App: React.FC = () => {

  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path='/' component={home} />
          <Route exact path='/login' component={login} />
          <Route exact path='/signup' component={signup} />
          <Route exact path='/events' component={events} />
          <Route exact path='/insightsheet' component={ISD} />
          <Route exact path='/insightsheetdetail' component={ISDetail} />
          <Route exact path={['/admin/login', '/admin']} component={login_admin} />
          <Route exact path='/admin/home' component={home_admin} />
          <Route exact path='/admin/dashboard' component={dashboard} />
          <Route exact path='/admin/insightsheet' component= {insightsheet} />
          <Route exact path='/admin/createInsightSheet' component= {CreateInsightSheet} />
          <Route exact path='/admin/products' component= {products} />
          <Route exact path='/admin/:page' component={SideMenu}/>
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
