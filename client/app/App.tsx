import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import home from "./pages/home/home";
import login from "./pages/login/login";
import signup from "./pages/signup/signup";
import events from "./pages/events/events";
import IS from "./pages/InsightSheet/insightsheet";
import ISDetail from "./pages/InsightSheet/insightsheetdetail";
import product from './pages/Product/product';
import buyproduct from './pages/Product/buyproduct';
import AdminLogin from "./admin/pages/login/login";
import dashboard from "./admin/pages/Dashboard/dashboard";
import insightsheet from "./admin/pages/InsightSheets/insightsheet";
import products from "./admin/pages/Products/products";
import CreateInsightSheet from "./admin/pages/InsightSheets/createInsightSheet";
import ProductsList from "./admin/pages/Products/productsList";
import CreateProduct from "./admin/pages/Products/createProduct";
import ProtectedRoute from "./admin/components/ProtectedRoute";
import history from "../utils/history";

const App: React.FC = () => {

  return (
    <>
      <Switch>
        <Route exact path="/" component={home} />
        <Route exact path="/login" component={login} />
        <Route exact path="/signup" component={signup} />
        <Route exact path="/events" component={events} />
        <Route exact path="/insightsheet" component={IS} />
        <Route exact path="/insightsheetdetail" component={ISDetail} />
        <Route exact path="/product" component={product} />
        <Route exact path="/buyproduct" component={buyproduct} />
        <Route exact path={["/admin/login", "/admin"]} component={AdminLogin} />
        <ProtectedRoute path="/admin/dashboard" component={dashboard} />
        <ProtectedRoute path="/admin/insightsheet" component={insightsheet} />
        <ProtectedRoute path="/admin/createInsightSheet" component={CreateInsightSheet} />
        <ProtectedRoute path="/admin/products" component={products} />
        <ProtectedRoute path="/admin/productsList" component={ProductsList} />
        <ProtectedRoute path="/admin/createProduct" component={CreateProduct} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
