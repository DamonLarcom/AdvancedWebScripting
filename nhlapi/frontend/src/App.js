import {BrowserRouter as Router, Routes,Route, Link} from 'react-router-dom'
import NotFound from "./components/NotFound"
import LoginPage from './components/LoginPage';

function App() {
  return (
    <div className="App min-h-screen bg-slate-800">
      <Router>
        <Routes>
          <Route exact path="/login" element={<LoginPage/>}/>

          {/* 404 page matches all unspecified paths */}
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
