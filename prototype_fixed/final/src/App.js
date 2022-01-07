import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Logout from "./Logout";
import Home from "./Home";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/logout" component={Logout} />
        </Switch>
      </Router>
    </div>
  );
}

export default App
