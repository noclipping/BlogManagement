import logo from "./logo.svg";
import "./App.css";
import Nav from "./Nav";
import CreatePost from "./CreatePost";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ManagePosts from "./ManagePosts";
import UpdatePost from "./components/UpdatePost";
function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route exact path="/newpost" element={<CreatePost />} />
          <Route exact path="/manage-posts" element={<ManagePosts />} />
          <Route exact path="/:id" element={<UpdatePost />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
