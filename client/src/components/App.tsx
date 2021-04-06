import React, { ReactElement } from 'react';
import Navbar from './Navbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Chat from './Pages/Chat';
import Closet from './Pages/Closet';
import Calendar from './Calendar';
import OutfitGrid from './Pages/OutfitGrid';
import FindAStore from './Pages/FindAStore';
import Logs from './logs/login';
import Logsout from './logs/Logout';
import axios from 'axios';


const App = (): ReactElement => {

  const [login, setLogin] = React.useState(false);

  React.useEffect(() => {
    axios.get('./isloggedin')
      .then(({ data }) => setLogin(data))
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className='main container'>
      {
        login === false ?
          <Router>
            <Navbar />
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/calendar' component={Calendar} />
              <Route path='/outfits' component={OutfitGrid} />
              <Route path='/closet' component={Closet} />
              <Route path='/findastore' component={FindAStore} />
              <Route path='/login' component={Logs} />
            </Switch>
          </Router>
          :
          <Router>
            <Navbar />
            <Switch>;
              <Route path='/' exact component={Home} />
              <Route path='/calendar' component={Calendar} />
              <Route path='/outfits' component={OutfitGrid} />
              <Route path='/closet' component={Closet} />
              <Route path='/chat' component={Chat} />
              <Route path='/findastore' component={FindAStore} />
              <Route path='/logout' component={Logsout} />
            </Switch>
          </Router>

      }
    </div>
  );
};

export default App;
