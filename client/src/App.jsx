import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import AllowanceForm from './pages/Allowance/Allowance'
import DeductionForm from './pages/Deduction/Deduction'
import ExpenseForm from './pages/Expenses/Expenses'
import NewStaff from './pages/NewStaff/NewStaff'
import ErrorPage from "./pages/Error/Error";
import Layout from "./Layout/Layout";
import {QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/" element={<Layout/>}>
        <Route path="AllowanceForm" element={<AllowanceForm />} />
        <Route path="DeductionForm" element={<DeductionForm />} />
        <Route path="ExpenseForm" element={<ExpenseForm />} />
        <Route path="NewStaff" element={<NewStaff />} />
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