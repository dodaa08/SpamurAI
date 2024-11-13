import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Landing from './app/Landing';
import SignUp from './app/SignUp';

function App() {
 return(
  <>
   <BrowserRouter>  
      <Routes>  
        <Route path="/" element={<Landing />} />  
        <Route  path="/signup" element={<SignUp />} />
      </Routes>  
    </BrowserRouter>
  </>
 )
}

export default App
