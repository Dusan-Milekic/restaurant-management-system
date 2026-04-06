import './App.css'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import MeniPage from './pages/MeniPage'
import TablePage from './pages/TablePage'
import InvoicesPage from './pages/InovciesPage'
import ReservationPage from './pages/ReservationsPage'

function App() {


  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage/>} />
        <Route path='/meni' element={<MeniPage/>}/>
        <Route path='/table' element={<TablePage/>}/>
        <Route path='/inovices' element={<InvoicesPage/>} />
        <Route path='/reservations' element={<ReservationPage/>} />
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
