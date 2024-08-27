
import { RouterProvider } from 'react-router-dom'
import './App.css'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { router } from './routes/Routes'

function App() {
  

  return (
    <>
   <RouterProvider router={router} />
   <ToastContainer  position="top-center"/>
   </>
  )
}

export default App

