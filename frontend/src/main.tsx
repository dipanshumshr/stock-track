import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from "react-router-dom";
import LoginPage from './pages/LoginPage.tsx';
import DashBoard from './pages/DashBoard.tsx';
import ProtectedRoutes from './pages/ProtectedRoutes.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AddStock from './pages/AddStock.tsx';
import SearchBox from './pages/SearchBox.tsx';

const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route index element={<LoginPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path='dashboard' element={<DashBoard />} />
        <Route path="stock/add" element={<AddStock/>} />
        <Route path="stock/search" element={<SearchBox/>}/>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
