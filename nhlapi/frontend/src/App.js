import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import NotFound from "./components/NotFound"
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage'
import Nav from './components/Nav';
import {useState, useEffect} from 'react'
import TeamDetails from './components/TeamDetails';
import Register from './components/Register';
import CreateTeam from './components/CreateTeam';
import PlayerDetails from './components/PlayerDetails';

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUser = localStorage.getItem("user")

    if(loggedUser) {
      setUser(JSON.parse(loggedUser))
    }
  },[])

  return (
    <div className="App min-h-screen bg-slate-800">
      <Router>
        <Nav user={user}/>
        <Routes>
          <Route exact path="/" element={<HomePage user={user}/>}/>
          <Route exact path="/login" element={<LoginPage setUser={setUser}/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/teams/:abbrev" element={<TeamDetails/>}/>
          <Route exact path="/teams/create" element={<CreateTeam/>}/>
          <Route exact path="/players/:id" element={<PlayerDetails/>}/>
          {/* 404 page matches all unspecified paths */}
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
