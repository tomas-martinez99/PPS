import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//rutas
import MainLayout from "./components/layout/MainLayout";
import LoginUser from "./components/login/loginUser/LoginUser";
import Register from "./components/login/register/register";
import RegisterSuccess from "./components/login/registerSuccess/RegisterSuccess";
import Home from "./components/reproduction/home/home";
import Movies from "./components/reproduction/movies/Movies";
import Series from "./components/reproduction/series/Series";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <MainLayout>
          <Home />
        </MainLayout>
      ),
    },
    {
      path: "/login",
      element: (
        <MainLayout>
          <LoginUser />
        </MainLayout>
      ),
    },
    {
      path: "/register",
      element: (
        <MainLayout>
          <Register />
        </MainLayout>
      ),
    },
    {
      path: "/registerSuccess",
      element: (
        <MainLayout>
          <RegisterSuccess />
        </MainLayout>
      ),
    },
    {
      path: "/profile",
      element: <MainLayout>{/* <Profile/> */}</MainLayout>,
    },
    {
      path: "/movies",
      element: <MainLayout>{<Movies />}</MainLayout>,
    },
    {
      path: "/series",
      element: <MainLayout>{<Series />}</MainLayout>,
    },
    {
      path: "/statistics",
      element: <MainLayout>{/* <Statistics/> */}</MainLayout>,
    },
    {
      path: "/newSerie",
      element: <MainLayout>{/* <NewSerie/> */}</MainLayout>,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
