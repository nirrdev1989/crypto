import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HistoryPage from './pages/History.page';
import HomePage from './pages/Home.page';
import MarketingPage from './pages/Marketing.page';
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
            <Switch>
               <Suspense fallback={<Loader />}>
                  <Route
                     path="/"
                     exact={true}
                     render={() => <HomePage />}
                  />
                  <Route
                     path="/history"
                     exact={true}
                     render={() => <HistoryPage />}
                  />
                  <Route
                     path="/markets"
                     exact={true}
                     render={() => <MarketingPage />}
                  />
               </Suspense>
            </Switch>
            {/* </Container> */}
         </div>
         <Footer />
      </BrowserRouter>
   );
}

export default App;


// const data = [
//    { price: '38821.0466289791', timestamp: 1612738800000 },
//    { price: '39007.2715658336', timestamp: 1612742400000 },
//    { price: '38803.7156432158', timestamp: 1612746000000 },
//    { price: '38582.4132171405', timestamp: 1612749600000 },
//    { price: '38359.2798893482', timestamp: 1612753200000 },
//    { price: '38263.7752237507', timestamp: 1612756800000 },
//    { price: '38698.1344144697', timestamp: 1612760400000 },
//    { price: '38893.1895367936', timestamp: 1612764000000 },
//    { price: '39187.2823920769', timestamp: 1612767600000 },
//    { price: '39338.0318738744', timestamp: 1612771200000 },
//    { price: '39294.5774360377', timestamp: 1612774800000 },
//    { price: '39115.6266807171', timestamp: 1612778400000 },
//    { price: '39480.2270710216', timestamp: 1612782000000 },
//    { price: '39524.8512025019', timestamp: 1612785600000 },
//    { price: '41614.10857206', timestamp: 1612789200000 },
//    { price: '43764.5374639776', timestamp: 1612792800000 },
//    { price: '43457.9679769723', timestamp: 1612796400000 },
//    { price: '43598.8913395273', timestamp: 1612800000000 },
//    { price: '43006.7860828431', timestamp: 1612803600000 },
//    { price: '42895.7381945117', timestamp: 1612807200000 },
//    { price: '42702.8843209942', timestamp: 1612810800000 },
//    { price: '42669.2377850318', timestamp: 1612814400000 },
//    { price: '43893.1899431548', timestamp: 1612818000000 },
//    { price: '44317.4789775569', timestamp: 1612821600000 },
//    { price: '44794.1419173439', timestamp: 1612825200000 },
//    { price: '46257.6024724466', timestamp: 1612828800000 },
//    { price: '46538.990047933', timestamp: 1612832400000 },
//    { price: '45930.0603780886', timestamp: 1612836000000 },
//    { price: '45832.064336514', timestamp: 1612839600000 },
//    { price: '46430.2698651694', timestamp: 1612843200000 },
//    { price: '46325.7416619953', timestamp: 1612846800000 },
//    { price: '35821.0466289791', timestamp: 1612738800000 },

// ]

