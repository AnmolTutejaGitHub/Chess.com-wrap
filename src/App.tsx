import { useState } from 'react';
import Navbar from './Components/Navbar';
import Search from './Components/Search';
import Footer from './Components/Footer';

const App: React.FC = () => {

  return (
    <div>
      <Navbar />
      <Search />
      <Footer />
    </div>
  )
}

export default App
