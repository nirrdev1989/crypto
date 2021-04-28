import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from './pages/Home.page';
import Header from './components/Header';
import Loader from './components/Loader';
import Footer from './components/Footer'
import Container from './components/Wrappers/Container';
import './App.css';

// console.log(process.env, mode)


function App() {
   return (
      <BrowserRouter>
         <Header />
         <div className="app">
            {/* <Container> */}
           <Suspense fallback={<Loader />}>
            <Switch>
                 <Route
                     path="/"
                     exact={true}
                     render={() => <HomePage />}
                  />
               <Route
                  path="*"
                  component={<h1>Not Found</h1>}
                  />
            </Switch>
          </Suspense>

            {/* </Container> */}
         </div>
         <Footer />
      </BrowserRouter>
   );
}

export default App;



