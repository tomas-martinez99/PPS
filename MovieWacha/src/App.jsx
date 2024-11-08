import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

//rutas
import MainLayout from "./components/layout/MainLayout";
import LoginUser from "./components/login/loginUser/LoginUser";
import Register from "./components/login/register/register";
import RegisterSuccess from "./components/login/registerSuccess/RegisterSuccess";
import Home from "./components/reproduction/home/Home";
import Movies from "./components/reproduction/movies/Movies";
import Series from "./components/reproduction/series/Series";
import AbmSeries from "./components/admin/abmSeries/AbmSeries";
import AbmMovies from "./components/admin/abmMovies/AbmMovies";
import SelectPlan from "./components/suscripcion/selectPlan/SelectPlan";
import ConfirmPlan from "./components/suscripcion/confirmPlan/ConfirmPlan";
import PaymentSuccess from "./components/suscripcion/payment/PaymentSuccess";
import WatchMovie from "./components/WatchMovie/WatchMovie";
import PreReproMovie from "./components/reproduction/pre-repro/PreReproMovie";
import PreReproSerie from "./components/reproduction/pre-repro/preReroSerie";
import SearchResults from "./components/search-results/SearchResults";
import ProtectedAdmin from "./protected/ProtectedAdmin";
import UserNotPermis from "./components/pages/UserNotPermis";
import AbmUser from "./components/admin/abmUser/abmUser";
import AbmGenres from "./components/admin/abmGenres/AbmGenres";

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
      path: "/payment/success",
      element: (
        <MainLayout>
          <PaymentSuccess />
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
      element: (
        <MainLayout>
          <Movies />
        </MainLayout>
      ),
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
      path: "/abmSeries",
      element: (
        <MainLayout>
          <ProtectedAdmin>
          <AbmSeries />
          </ProtectedAdmin>
        </MainLayout>
      ),
    },
    {
      path: "/abmUser",
      element: (
        <MainLayout>
          <ProtectedAdmin>
          <AbmUser />
          </ProtectedAdmin>
        </MainLayout>
      ),
    },
    {
      path: "/abmMovies",
      element: (
        <MainLayout>
          <AbmMovies />
        </MainLayout>
      ),
    },
    {
      path: "/abmGenres",
      element: (
        <MainLayout>
          <AbmGenres />
        </MainLayout>
      ),
    },
    {
      path: "/selectPlan",
      element: (
        <MainLayout>
          <SelectPlan />
        </MainLayout>
      ),
    },
    {
      path: "/confirmPlan",
      element: (
        <MainLayout>
          <ConfirmPlan />
        </MainLayout>
      ),
    },
   
    {
      path: "/watch/:movieId",
      element: (
        <MainLayout>
          <WatchMovie />
        </MainLayout>
      ),
    },
    {
      path: "/pre-repro-movie/:movieId",
      element: (
        <MainLayout>
          <PreReproMovie />
        </MainLayout>
      ),
    },
    {
      path: "/pre-repro-serie/:serieId",
      element: (
        <MainLayout>
          <PreReproSerie />
        </MainLayout>
      ),
    },
    {
      path: "/search-results/:searchString",
      element: (
        <MainLayout>
          <SearchResults />
        </MainLayout>
      ),
    },
    {
      path: "/userNotPermis",
      element: (
        <MainLayout>
          <UserNotPermis/>
        </MainLayout>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
