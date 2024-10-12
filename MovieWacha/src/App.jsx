import './App.css'
import Dashboard from './components/dashboard/Dashboard'
import MainLayout from './components/layout/MainLayout'
import LoginUser from './components/login/loginUser/LoginUser';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from './components/login/register/register';
import NewSeason from './components/films/newSeason/NewSeason';
import NewSerie from './components/films/newSerie/NewSerie';
import RegisterSuccess from './components/login/registerSuccess/RegisterSuccess';
import Profile from './components/login/profile/Profile';
import MoviesCard from './components/films/moviesCard/MoviesCard';
import SeriesCard from './components/films/serieCard/SeriesCard';
import Statistics from './components/statistics/Statistics';
import AdminMoviesList from './components/films/adminMoviesList/adminMoviesList';

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
      path:"/registerSuccess",
      element:(
        <MainLayout>
          <RegisterSuccess/>
        </MainLayout>
      )
    },
    {
      path:"/profile",
      element:(
        <MainLayout>
          <Profile/>
        </MainLayout>
      )
    },
    {
      path:"/moviesCard",
      element:(
        <MainLayout>
          <MoviesCard/>
        </MainLayout>
      )
    },
    {
      path:"/seriesCard",
      element:(
        <MainLayout>
          <SeriesCard/>
        </MainLayout>
      )
    },
    {
      path:"/statistics",
      element:(
        <MainLayout>
          <Statistics/>
        </MainLayout>
      )
    },
    {
      path:"/newSerie",
      element:(
        <MainLayout>
          <NewSerie/>
        </MainLayout>
      )
    }


  ])

  return <RouterProvider router={router}/>;
   
  
}

export default App
