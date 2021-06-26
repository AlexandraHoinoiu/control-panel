import './App.css';
import Posts from './Posts';
import Reports from './Reports';
import Users from './Users';
import Supervisors from './Supervisors';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from './Login';

function App() {
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <Posts /> : <Redirect to="/login" />}
          </Route>
          <Route path="/reports">
            {user ? <Reports /> : <Redirect to="/login" />}
          </Route>
          <Route path="/users">
            {user ? <Users /> : <Redirect to="/login" />}
          </Route>
          <Route path="/supervisors">
            {user ? <Supervisors /> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            {user ? <Posts /> : <Login />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
