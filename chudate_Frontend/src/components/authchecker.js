import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function AuthWrapper(){
  const location = useLocation(); // current location

  //const userLogged = JSON.parse(localStorage.getItem('login'));

  return (Cookies.get('Log_in_ID')!=null)
    ? <Outlet />
    : (
      <Navigate
        to="/"
        replace
        state={{ from: location }} // <-- pass location in route state
      />
    );
};