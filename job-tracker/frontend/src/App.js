import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NotFound from './pages/NotFound';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App min-h-screen bg-slate-800">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>

          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>

          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
