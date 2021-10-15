import Dashboard from "components/admin/dashboard/Dashboard";
import AddOrEditPolice from "components/admin/police/AddOrEditPolice";
import AddOrEditCity from "components/admin/city/AddOrEditCity";
import AddOrEditLocation from "components/admin/cityLocation/AddOrEditLocation";
import Login from "components/auth/Login";
import SignUp from "components/auth/SignUp";
import RegisterComplaint from "components/user/complaint/RegisterComplaint";
import MyComplaints from "components/user/complaint/MyComplaints";
import Home from "components/user/home/Home";
import AdminLayout from "layouts/admin/Layout-routes";
import PoliceLayout from "layouts/police/Layout-routes";
import UserLayout from "layouts/user/Layout-routes";
import Complaints from "components/police/complaints/ReceivedComplaints";

export {
  Dashboard,
  AddOrEditPolice,
  AddOrEditCity,
  AddOrEditLocation,
  Complaints,
  AdminLayout,
  PoliceLayout,
  UserLayout,
  Home,
  RegisterComplaint,
  MyComplaints,
  Login,
  SignUp,
};
