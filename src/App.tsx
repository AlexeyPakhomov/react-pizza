import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './scss/app.scss';
import { Header } from './components';
import Home from './pages/Home';
import Preloader from './components/Preloader/Preloader';

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const FullPizza = lazy(
  () => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza/FullPizza'),
);

function App() {
  const location = useLocation().pathname;

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="cart"
              element={
                <Suspense fallback={<Preloader />}>
                  <Cart />
                </Suspense>
              }
            />
            <Route
              path="pizza/:id"
              element={
                <Suspense fallback={<Preloader />}>
                  <FullPizza />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<Preloader />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </div>
      {location === '/' && <span className="license">Images of pizzas by Julia on Freepik</span>}
    </div>
  );
}

export default App;
