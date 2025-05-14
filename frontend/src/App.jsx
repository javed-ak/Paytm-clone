import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import Send from '../pages/Send';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <>
    <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<SignUp />}/>
        <Route path='/signin' element={<SignIn />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/send' element={<Send />}/>
      </Routes>
    </BrowserRouter>
    </RecoilRoot>
    </>
  )
}

export default App
