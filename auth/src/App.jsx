import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

import Landing from './pages/Landing';
import SignUp from './pages/Signup';
import Signin from './pages/Signin';
import Writer from './pages/Writer';
function App() {
 return(
  <>
   <BrowserRouter>  
      <Routes>  
        <Route path="/" element={<Landing />} />  
        <Route  path="/signup" element={<SignUp />} />
        <Route  path="/signin" element={<Signin />} />
        <Route  path="/write" element={<Writer />} />

      </Routes>  
    </BrowserRouter>
  </>
 )
}

export default App
