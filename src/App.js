import './App.css'
// import header from './components/header'; 
import Navbar from './components/navbar/navbar';
import ImportFile from './components/import/import'; 
import SearchFile from './components/search/search'; 
import Footer from './components/footer/footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<ImportFile />} />
          <Route path='/search' element={<SearchFile />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App