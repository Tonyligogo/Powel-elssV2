import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements} from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import ErrorPage from "./pages/Error/Error";
import Layout from "./Layout/Layout";
import {QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/LoginPage" element={<LoginPage />} />
      <Route path="/" element={<Layout/>}>
        
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