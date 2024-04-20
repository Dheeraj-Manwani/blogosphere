import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Blogs } from "./pages/Blogs";
import { Blog } from "./pages/Blog";
import { NewBlog } from "./pages/EditorPage";
import { Start } from "./pages/Start";
import { useRecoilState, useRecoilValue } from "recoil";
import { loggedUser } from "./recoil/atom/atom";
import { BACKEND_URL } from "./config";
import { UserBlogs } from "./pages/UserBlogs";
import { Root } from "./pages/Root";

function App() {
  const loggedInUserName = useRecoilValue(loggedUser);
  const [_, setLoggedUser] = useRecoilState(loggedUser);

  if (localStorage.getItem("token") && loggedInUserName === "") {
    try {
      axios
        .get(`${BACKEND_URL}/api/v1/logged-in-user-name`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setLoggedUser(res.data.name);
        });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route path="/" element={<Start />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blogs" element={<Blogs />} />
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
