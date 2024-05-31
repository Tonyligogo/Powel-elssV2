import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import PasswordResetEmail from "./pages/ForgotPassword/PasswordResetEmail";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import HomePage from "./pages/Home/Home";
// forms
import AllowanceForm from './pages/Allowance/Allowance'
import DeductionForm from './pages/Deduction/Deduction'
import ExpenseForm from './pages/Expenses/Expenses'
//Profile
import EditProfile from './pages/EditProfile/EditProfile'
// Add user
import AddUser from "./pages/AddUser/AddUser";
// staff
import NewStaff from './pages/NewStaff/NewStaff'
import StaffRecords from './pages/StaffRecords/StaffRecords'
// customers
import CustomerRecords from './pages/CustomerRecords/CustomerRecords'
import NewCustomer from './pages/CustomerRecords/NewCustomer'
// Products
import Products from './pages/Products/Products'
// Quotation
import Quotation from './pages/Quotation/Quotation'
// error page
import ErrorPage from "./pages/Error/Error";
// layout
import Layout from "./Layout/Layout";
import {QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/send-password-reset-email" element={<PasswordResetEmail />} />
      <Route path="/reset-forgotten-password/:slug" element={<ForgotPassword />} />
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<HomePage />} />
        {/* forms */}
        <Route path="AllowanceForm" element={<AllowanceForm />} />
        <Route path="DeductionForm" element={<DeductionForm />} />
        <Route path="ExpenseForm" element={<ExpenseForm />} />
        {/* Edit profile */}
        <Route path="EditProfile" element={<EditProfile />} />
        {/* Add system user */}
        <Route path="AddUser" element={<AddUser />} />
        {/* staff */}
        <Route path="NewStaff" element={<NewStaff />} />
        <Route path="StaffRecords" element={<StaffRecords />} />
        {/* customers */}
        <Route path="NewCustomer" element={<NewCustomer />} />
        <Route path="CustomerRecords" element={<CustomerRecords />} />
        {/* Products */}
        <Route path="Products" element={<Products />} />
        {/* Quotation */}
        <Route path="CreateQuotation" element={<Quotation />} />
        {/* error page */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Route>
  )
);

function App() {
  const queryClient = new QueryClient();
  return(
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster position='top-right'/>
    </QueryClientProvider>
  );
}
export default App;