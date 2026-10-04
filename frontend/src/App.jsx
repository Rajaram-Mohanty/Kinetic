import './App.css'
import { Routes, Route } from 'react-router-dom'
import Start from '../pages/Start'
import UserLogin from '../pages/UserLogin'
import UserSignup from '../pages/UserSignup'
import Home from '../pages/Home'
import UserProtectWrapper from '../pages/UserProtectWrapper'



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
      </Routes>
    </div>
    
  )
}

export default App
