import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom'
import DetailsPage from './pages/DetailsPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App min-h-screen">
      <Router>
        <Routes>
          {/* Routes matched from top to bottom */}
          <Route exact path="/details/:name" element={<DetailsPage/>}></Route>
          <Route exact path="/" element={<Home/>}></Route>

          {/* 404 page for nav to routes that dont exist */}
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
