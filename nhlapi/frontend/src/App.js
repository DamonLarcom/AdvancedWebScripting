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
import CreatePlayer from "./components/CreatePlayer"
import UpdatePlayer from './components/UpdatePlayer';
import UpdateTeam from "./components/UpdateTeam"

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
          <Route exact path="/teams/:abbrev/update" element={<UpdateTeam/>}/>

          <Route exact path="/players/:id" element={<PlayerDetails/>}/>
          <Route exact path="/players/create" element={<CreatePlayer/>}/>
          <Route exact path="/players/:id/update" element={<UpdatePlayer/>}/>

          {/* 404 page matches all unspecified paths */}
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
