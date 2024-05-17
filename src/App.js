import './App.css';
import { Route, createBrowserRouter, RouterProvider, createRoutesFromElements } from 'react-router-dom';
import Login from './Components/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard/Dashboard';
import VerifyEmail from './Components/VerifyEmail/VerifyEmail';
import FogotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Register from './Components/Register/Register';
import PrivateRoute from './Components/RouteGauard/PrivateRoute';
import GuestRoute from './Components/RouteGauard/GuestRoute';
//import Rect from './Components/Dashboard/rect';
import SexOffender from './Components/Dashboard/SexOffender/SexOffender';
import SocialMedia from './Components/Dashboard/SocialMedia/SocialMedia';
import PurchaseCredits from './Components/Dashboard/PurchaseCredits/PurchaseCredits';
import DashOutlet from './Components/Dashboard/Outlet/DashOutlet';
import { useDispatch } from 'react-redux';
import { setjwtAuth, clearAuth } from './features/user/userAuth';
import GuestLogin from './Components/Login/GuestLogin';
import GuestRegister from './Components/Register/GuestRegister';
import GuestReview from './Components/Dashboard/GuestReview';
import MyPoint from './Components/Dashboard/MyPoints/MyPoint';
import MyReward from './Components/Dashboard/MyReward';
import PageNotFound from './Components/PageNotFound';


function App() {

  const dispatch = useDispatch();
  dispatch(setjwtAuth())

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<GuestRoute Component={Login} />} />
        <Route path="guest-login" element={<GuestRoute Component={GuestLogin} />} />
        <Route path="verify-otp" element={<GuestRoute Component={VerifyEmail} />} />
        <Route path="reset-password/:token" element={<GuestRoute Component={ResetPassword} />} />
        <Route path="register" element={<GuestRoute Component={Register} />} />
        <Route path="guest-register" element={<GuestRoute Component={GuestRegister} />} />
        <Route path="*"element={<PageNotFound />}/>
        <Route path="forgot-password" element={<GuestRoute Component={FogotPassword} />} />
        <Route path="dashboard" element={<PrivateRoute Component={DashOutlet} />}>
          <Route index element={<Dashboard />} />
          <Route path="sex-offender" element={<SexOffender />} />
          <Route path="guest-review" element={<GuestReview />} />
          <Route path="my-point" element={<MyPoint/>} />
          <Route path="my-reward" element={<MyReward/>} />
          <Route path="social-media" element={<SocialMedia />} />
          <Route path="purchase-credits" element={<PurchaseCredits />} />
        </Route>
      </>
    )
  );
  return (
    <RouterProvider router={router} />
  );
}

export default App;
