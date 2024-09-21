import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { lazy, Suspense, useEffect } from "react";
import Home from "./pages/Home";

const Resume = lazy(() => import("./pages/Resume"));

const ContactMe = lazy(() => import("./pages/ContactMe"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));

import { getUser } from "./store/slices/user.slice";
import { getProject } from "./store/slices/project.slice";
import { changeTheme } from "./store/slices/theme.slice";
import { getAllSoftwareApplication } from "./store/slices/software.slice";
import { getAllSkill } from "./store/slices/skill.slice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllTimeline } from "./store/slices/timeline.slice";
import Loading from "./components/Loading";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(getProject());
    dispatch(getAllTimeline());
    dispatch(getAllSoftwareApplication());
    dispatch(getAllSkill());
  }, [dispatch]);

  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const getTheme = localStorage.getItem("theme");
    if (getTheme) {
      dispatch(changeTheme(getTheme));
      document.body.classList = getTheme;
    } else {
      localStorage.setItem("theme", "dark");
      dispatch(changeTheme("dark"));
      document.body.classList = "dark";
    }
  }, [theme]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="resume"
              element={
                <Suspense fallback={<Loading />}>
                  <Resume />
                </Suspense>
              }
            />
            <Route
              path="projects"
              element={
                <Suspense fallback={<Loading />}>
                  <Projects />
                </Suspense>
              }
            />

        

            <Route
              path="contact"
              element={
                <Suspense fallback={<Loading />}>
                  <ContactMe />
                </Suspense>
              }
            />
          </Route>
        </Routes>
        <ToastContainer position="bottom-right" theme="dark" />
      </Router>
    </>
  );
}

export default App;
