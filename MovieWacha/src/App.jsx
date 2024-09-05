import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import MainLayout from './components/layout/MainLayout'
import LoginUser from './components/login/loginUser/LoginUser';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from './components/login/register/register';
import NewFilm from './components/films/newFilm/NewFilm';
import NewSeason from './components/films/newSeason/NewSeason';
import NewSerie from './components/films/newSerie/NewSerie';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:(
        <MainLayout>
          <Dashboard/>
        </MainLayout>
      )
    },
    {
      path:"/login",
      element:(
        <MainLayout>
          <LoginUser/>
        </MainLayout>
      )
    },
    {
      path:"/register",
      element:(
        <MainLayout>
          <Register/>
        </MainLayout>
      )
    },
    {
      path:"/addFilm",
      element:(
        <MainLayout>
          <NewFilm/>
        </MainLayout>
      )
    },
    {
      path:"/addSerie",
      element:(
        <MainLayout>
          <NewSerie/>
        </MainLayout>
      )
    },
    {
      path:"/addSeason",
      element:(
        <MainLayout>
          <NewSeason/>
        </MainLayout>
      )
    }

  ])

  return <RouterProvider router={router}/>;
   
  
}

export default App
