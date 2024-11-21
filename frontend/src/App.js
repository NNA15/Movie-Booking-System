import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import UserPage from './components/UserPage';
import AddCinema from './components/AddCinema';
import AddRoom from './components/AddRoom';
import AddMovie from './components/AddMovie';
import AdminPage from "./components/AdminPage";
import AddShow from './components/AddShow';
import SelecShow from './components/SelectShow';
import SelectSeat from './components/SelectSeat';
import BookingInfo from './components/BookingInfor';
import MyTicket from './components/MyTicket';
import BookingDetail from './components/BookingDetail';
import SignUp from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/reset-password" element={<ResetPassword/>}></Route>
          <Route path="/admin" element={<AdminPage/>}></Route>
          <Route path="/user" element={<UserPage/>}></Route>
          <Route path="admin/cinema/create" element={<AddCinema/>}></Route>
          <Route path="admin/room/create" element={<AddRoom/>}></Route>
          <Route path="admin/movie/create" element={<AddMovie/>}></Route>
          <Route path="admin/show/create" element={<AddShow/>}></Route>
          <Route path="show/:movieId" element={<SelecShow/>}></Route>
          <Route path="seat/:showId" element={<SelectSeat/>}></Route>
          <Route path="booking-info" element={<BookingInfo/>}></Route>
          <Route path="myticket" element={<MyTicket/>}></Route>
          <Route path="booking/:bookingId" element={<BookingDetail/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
