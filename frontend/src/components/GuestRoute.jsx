import { Navigate } from 'react-router-dom';

function GuestRoute({ children }) {
  const token = localStorage.getItem('token');

  if (token) {
    return <Navigate to="/kategori-ruangan" replace />;
  }

  return children;
}

export default GuestRoute;