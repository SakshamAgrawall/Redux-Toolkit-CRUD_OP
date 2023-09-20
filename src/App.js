import { Route, Routes } from "react-router-dom";
import Post from './Components/Post';
import CreatePost from './Components/CreatePost'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Post />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </>
  );
}

export default App;
