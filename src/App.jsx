import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from './router';
import { Toaster } from "sonner";
import { Provider } from 'react-redux';
import { store } from './app/store';

function App() {
  return (
    <>
      <Provider store={store}>
        <Toaster position="top-right" richColors />
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
