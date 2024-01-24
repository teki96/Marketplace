import React, { useState, useCallback, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthContext } from './shared/components/context/auth-context';
import Authenticate from './users/pages/Authenticate';
import CreateItem from './items/pages/CreateItem';
import Items from './items/pages/Items';
import MyItems from './items/pages/MyItems';
import Navbar from './shared/components/navbar/Navbar';

const queryClient = new QueryClient();
let logoutTimer;

// test

function App() {
  const [token, setToken] = useState(false);
  const [userId, setuser] = useState(false);
  const [name, setname] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(false);

  const login = useCallback((uid, token, name) => {
    setToken(token);
    setuser(uid);
    setname(name);
    const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        token,
        name,
        expiration: tokenExpirationDate.toISOString(),
      }),
    );
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  const logout = useCallback(() => {
    setToken(null);
    setuser(null);
    setname('');
    setTokenExpirationDate(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Items logout={logout} />
        </Route>
        <Route path="/create" exact>
          <CreateItem />
        </Route>
        <Route path="/items" exact>
          <MyItems />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/auth">
          <Authenticate />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        login,
        logout,
        name,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar logout={logout} />
          <main>{routes}</main>
        </Router>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
