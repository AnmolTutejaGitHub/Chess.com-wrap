import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Profile from './Components/Profile';

const App: React.FC = () => {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
