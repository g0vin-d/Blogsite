import NavBar from './components/navbar/NavBar';
import CreateBlog from './pages/createblog/CreateBlog';
import Homepage from './pages/homepage/Homepage';
import Single from './pages/single/Single';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/blog/:slug" element={<Single />} />
      </Routes>
    </>
  );
}

export default App;
