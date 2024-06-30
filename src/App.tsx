import './App.css'
import Home from './pages/Home';
import Reset from './pages/Reset';
import { BrowserRouter ,Routes, Route} from 'react-router-dom';
import GameSkeleton from './pages/GameSkeleton';
import { useEffect } from 'react';

function App () {

  useEffect(() => {
    document.title = '3D Golf Game'
  }, [])

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/game1" element={<GameSkeleton level={1}/>}/>
          <Route path="/game2" element={<GameSkeleton level={2}/>}/>
          <Route path="/game3" element={<GameSkeleton level={3}/>}/>
          <Route path="/reset" element={<Reset/>}/>
          <Route path="/*" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
