import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import HistoryPage from './pages/History.page';
import HomePage from './pages/Home.page';
import MarketingPage from './pages/Marketing.page';
import Header from './components/Header';
import Loader from './components/Loader';
import Container from './components/Wrappers/Container';
import './App.css';

function App() {
   return (
      <BrowserRouter>
         <Header />
         <div className="app">
            <Container>
               <Switch>
                  <Suspense fallback={<Loader />}>
                     <Route
                        path="/"
                        exact={true}
                        render={() => <HomePage />}
                     />
                     {/* <Route
                        path="/history"
                        exact={true}
                        render={() => <HistoryPage />}
                     />
                     <Route
                        path="/markets"
                        exact={true}
                        render={() => <MarketingPage />}
                     /> */}
                  </Suspense>
               </Switch>
            </Container>
         </div>
      </BrowserRouter>
   );
}

export default App;


// const arr = [
//    { price: "37619.16", date: "5.2.2021" },
//    { price: "37878.13", date: "5.2.2021" },
//    { price: "38079.38", date: "5.2.2021" },
//    { price: "38027.28", date: "5.2.2021" },
//    { price: "37911.16", date: "5.2.2021" },
//    { price: "37757.01", date: "5.2.2021" },
//    { price: "37700.29", date: "5.2.2021" },
//    { price: "37465.29", date: "5.2.2021" },
//    { price: "37521.51", date: "5.2.2021" },
//    { price: "37681.21", date: "5.2.2021" },
//    { price: "37747.97", date: "6.2.2021" },
//    { price: "37795.43", date: "6.2.2021" },
//    { price: "38047.63", date: "6.2.2021" },
//    { price: "38732.45", date: "6.2.2021" },
//    { price: "38584.11", date: "6.2.2021" },
//    { price: "39391.28", date: "6.2.2021" },
//    { price: "39249.88", date: "6.2.2021" },
//    { price: "39052.17", date: "6.2.2021" },
//    { price: "39081.21", date: "6.2.2021" },
//    { price: "39352.84", date: "6.2.2021" },
//    { price: "39330.43", date: "6.2.2021" },
//    { price: "39489.36", date: "6.2.2021" },
//    { price: "39851.57", date: "6.2.2021" },
//    { price: "39998.74", date: "6.2.2021" },
//    { price: "40331.96", date: "6.2.2021" },
//    { price: "40232.18", date: "6.2.2021" },
//    { price: "40243.80", date: "6.2.2021" },
//    { price: "40381.89", date: "6.2.2021" },
//    { price: "40808.12", date: "6.2.2021" },
//    { price: "40630.58", date: "6.2.2021" },
//    { price: "40375.07", date: "6.2.2021" },
//    { price: "40336.64", date: "6.2.2021" },
//    { price: "39975.49", date: "6.2.2021" },
//    { price: "39913.04", date: "6.2.2021" },
//    { price: "40179.60", date: "7.2.2021" },
//    { price: "39543.69", date: "7.2.2021" },
//    { price: "39318.55", date: "7.2.2021" },
//    { price: "39435.80", date: "7.2.2021" },
//    { price: "38731.21", date: "7.2.2021" },
//    { price: "38755.65", date: "7.2.2021" },
//    { price: "38628.01", date: "7.2.2021" },
//    { price: "38356.72", date: "7.2.2021" },
//    { price: "38705.07", date: "7.2.2021" },
//    { price: "38771.32", date: "7.2.2021" },
//    { price: "39188.27", date: "7.2.2021" }
// ]
// console.log(arr.length)

