import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';


const Skills = lazy(() => import('./pages/Skills'));
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);



  const PrivateRoute = () => {
    return (
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route
            index
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <Skills />
              </Suspense>
            }
          />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    );
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        {localStorage.getItem('token') ? (<Route path="/*" element={<PrivateRoute />} />) : <Route path="login" element={<SignIn />} />}
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes >
    </>
  );
}

export default App;
