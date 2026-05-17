import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar.js';
import { Banner } from './components/Banner/Banner.js';
import { About } from './components/About/About.js';
import { Skills } from './components/Skills/Skills.js';
import { Projects } from './components/Projects/Projects.js';
import { Footer } from './components/Footer/Footer.js';
import { ProjectPage } from './components/ProjectPage/ProjectPage.js';
import { ProjectNavBar } from './components/ProjectPage/ProjectNavBar.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeLayout = () => (
  <div className="App">
    <NavBar />
    <Banner />
    <About />
    <Skills />
    <Projects />
    <Footer />
  </div>
);

const ProjectLayout = () => (
  <div className="App">
    <ProjectNavBar />
    <ProjectPage />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/project/:slug" element={<ProjectLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
