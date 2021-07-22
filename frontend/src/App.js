import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";

import * as sessionActions from './store/session'
import LoginFormPage from "./components/LoginFormPage";
import SignUpFormPage from "./components/SignUpFormPage";
import Navigation from "./components/Navigation";
import Home from "./pages/HomePage/HomePage";
import Toys from './pages/ToysPage/ToysPage'
import ToysDetail from './pages/ToysPage/ToysDetail'
import EditToys from "./pages/UsersToy/UsersToy";
import Hosting from "./pages/HostPage/HostPage";
import AddImages from "./pages/ImagePage/ImagePage";
import UsersPage from "./pages/UsersPage/UsersPage";

function App() {
  const dispatch = useDispatch();
  const [ isLoaded, setLoaded ] = useState(false)

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setLoaded(true))
  }, [dispatch])


  return (
    <>
      <Navigation isLoaded={isLoaded}></Navigation>
      <Switch>
        <Route exact path='/'>
          {isLoaded && <Home/>}
        </Route>
        <Route path='/login'>
          <LoginFormPage/>
        </Route>
        <Route path='/sign-up'>
          <SignUpFormPage/>
        </Route>
        <Route exact path='/toys'>
          <Toys/>
        </Route>
        <Route path='/hosting'>
          <Hosting/>
        </Route>
        <Route exact path='/toys/:toyId'>
          <ToysDetail/>
        </Route>
        <Route path='/toy/edit'>
          {isLoaded && <EditToys/>}
        </Route>
        <Route path='/images/:toyId'>
          <AddImages props/>
        </Route>
        <Route exact path='/user/:userId'>
          {isLoaded &&  <UsersPage/>}
        </Route>
      </Switch>
    </>
  );
}

export default App;
