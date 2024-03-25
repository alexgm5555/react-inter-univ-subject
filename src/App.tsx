import React, { FC } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './App.css';
import {
  SubjectList,
  EnrolledStudents,
  AllStudents
} from './pages';


const router = createBrowserRouter([
  {
    path: "/",
    element: <SubjectList />,
  },
  {
    path: '/SubjectList',
    element: <SubjectList />
  },
  {
    path: '/EnrolledStudents',
    element: <EnrolledStudents />
  },
  {
    path: '/AllStudents',
    element: <AllStudents />
  },
]);

const App:FC =()=>{
  return (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  );
}

export default App;
