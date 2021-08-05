import './App.css';
import Login from './View/Login/Login';
import CreateAcount from './View/CreateAcount/CreateAcount';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './View/Home/Home'
import Fiel from './View/Fiel/Fiel'
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <Switch>
            <Route
              exact
              path="/login"
              component={Login}
            /><Route
              exact
              path="/criar"
              component={CreateAcount}
            />
            <Route
              exact
              path="/"
              component={Home}
            /> <Route
              exact
              path="/fiel"
              component={Fiel}
            />
          </Switch>
        </div>
      </BrowserRouter >
    </div>
  );
}

export default App;
