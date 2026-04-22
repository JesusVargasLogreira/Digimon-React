import { BrowserRouter as Router, Route, Routes, Link } from 'react-router';
import Home from './home';
import './App.css'

function App() {

  return (
    <>
      <Router>
        <nav className="c-menu">
          <Link to="/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDy9mBtyJWUPLRobv__N2OwHYdiKAWarKroQ&s" /><p>Home</p></Link>
          <Link to="/favoritos"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwirKiGL1VFlx1A456XT5nxNyWds8y4-K5zg&s" /><p>Favoritos</p></Link>
          <Link to="/original"><img src="https://assets.streamlinehq.com/image/private/w_240,h_240,ar_1/f_auto/v1/icons/streamline-freehand/video-games/manga/manga-japanese-comic-agumon-digimon-digital-monster-hf3f8spk39unygm7rutbmr.png?_a=DATAiZAAZAA0" /><p>Original</p></Link>
          <Link to="/informativa"><img src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/more-info-icon.png" /><p>Informativa</p></Link>
          <Link to="/usuario"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNzXYh-X4wxX1jfbPywa8HWoNGDnx1Tlo0-g&s" /><p>Usuario</p></Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/original" element={<Original />} />
          <Route path="/informativa" element={<Informativa />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/digimon/:digimon" element={<Digimon />} /> */}
        </Routes>
      </Router>
    </>
  )
}

export default App
