import Header from './components/Header.js';
import Footer from './components/Footer.js';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/contents/Home.js';
import Groceries from './components/contents/Groceries.js';
import Items from './components/contents/Items.js';


function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <div className="contents">
          <Switch>
            <Route exact={true} path="/home" component={Home} />
            <Route exact={true} path="/groceries" component={props => <Groceries {...props} testProps={true} />} />
            <Route exact={true} path="/items" component={props => <Items {...props} testProps={true} />} />
            <Redirect to={{pathname: "/home"}} />
          </Switch>

      </div>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
