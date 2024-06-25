import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blogs } from "./pages/Blogs";
import { Blog } from "./pages/Blog";
import { NewBlog } from "./pages/EditorPage";
import { Start } from "./pages/Start";
import { useRecoilState } from "recoil";
import { loggedUser } from "./recoil/atom/atom";
import { UserBlogs } from "./pages/UserBlogs";
import { Root } from "./pages/Root";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Profile } from "./pages/Profile";

function App() {
  const [loggedInUser, setLoggedUser] = useRecoilState(loggedUser);

  useEffect(() => {
    if (
      localStorage.getItem("token") &&
      loggedInUser?.name === "" &&
      loggedInUser?.email === ""
    ) {
      const decoded: { id: string; name: string; email: string } = jwtDecode(
        localStorage.getItem("token") || ""
      );
      setLoggedUser({
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
      });
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="/" element={<Start />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/user-blogs" element={<UserBlogs />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/blogs/new" element={<NewBlog />} />
            <Route path="/blogs/edit/:id" element={<NewBlog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
