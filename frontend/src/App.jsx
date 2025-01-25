import './App.css'

import HomePage from './components/HomePage/HomePage'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup';
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
//   Outlet
// } from "react-router-dom";

// function RootLayout() {
//   return (
//     <>
//       <Header />
//       <Outlet />
//     </>
//   );
// }
function App() {
  

  return (
    <>
      <BrowserRouter future={{
    v7_relativeSplatPath: true,
    v7_startTransition: true,
  }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          {/* <Route path='/profile' element= */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
