import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from './pages/Home.page';
import Header from './components/Header';
import Loader from './components/Loader';
import Footer from './components/Footer'
import './App.css';
import Notfound from './pages/Notfound';

// console.log(process.env, mode)


function App() {
   return (
      <BrowserRouter>
         <Header />
         <div className="app">
            <Suspense fallback={<Loader />}>
               <Switch>
                  <Route
                     path="/"
                     exact={true}
                     render={() => <HomePage />}
                  />
                  <Route
                     path="*"
                     component={Notfound}
                  />
               </Switch>
            </Suspense>
         </div>
         {/* <Footer /> */}
      </BrowserRouter>
   );
}

export default App;