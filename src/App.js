import { Input } from "./components/Input/Input";
import { Details } from "./components/Details/Details";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Input} />
        <Route path="/details/:item" component={Details} />
      </Switch>
    </Router>
  );
}

export default App;
