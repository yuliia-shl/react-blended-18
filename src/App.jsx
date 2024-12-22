import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import Rates from './pages/Rates';
import { useEffect } from 'react';
import { getUserInfo } from './service/opencagedataApi';
import { getCurrency } from './redux/currency/ops';
import { useDispatch } from 'react-redux';
import { setDefaultCurrency } from './redux/currency/slice';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    async function success(pos) {
      const crd = pos.coords;
      dispatch(getCurrency(crd));
    }

    function error(err) {
      dispatch(setDefaultCurrency('USD'));
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    window.navigator.geolocation.getCurrentPosition(success, error, options);
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="/rates" element={<Rates />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
