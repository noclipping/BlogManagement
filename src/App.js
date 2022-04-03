import logo from "./logo.svg";
import "./App.css";
import Nav from "./Nav";
import CreatePost from "./CreatePost";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ManagePosts from "./ManagePosts";
function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/BlogManagement/" element={<CreatePost />} />
          <Route
            path="/BlogManagement/manage-posts"
            element={<ManagePosts />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
