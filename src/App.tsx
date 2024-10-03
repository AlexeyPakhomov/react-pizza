import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import './scss/app.scss';
import { Header } from './components';
import Home from './components/pages/Home';
import Preloader from './components/Preloader/Preloader';

const Cart = lazy(() => import('./components/pages/Cart'));
const NotFound = lazy(() => import('./components/pages/NotFound'));
const FullPizza = lazy(() => import('./components/pages/FullPizza/FullPizza'));

function App() {
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
    </div>
  );
}

export default App;
