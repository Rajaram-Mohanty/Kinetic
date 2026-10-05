import './App.css'
import { Routes, Route } from 'react-router-dom'
import Start from '../pages/Start'
import UserLogin from '../pages/UserLogin'
import UserSignup from '../pages/UserSignup'
import Home from '../pages/Home'
import UserProtectWrapper from '../pages/UserProtectWrapper'
import CaptainLogin from '../pages/CaptainLogin'
import CaptainSignup from '../pages/CaptainSignup'
import CaptainHome from '../pages/CaptainHome'
import CaptainProtectWrapper from '../pages/CaptainProtectWrapper'

function App() {
  return (
      <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/home'
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          } />
        <Route path='/captain-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>

        } />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />

      </Routes>
    </div>
    
  )
}

export default App
