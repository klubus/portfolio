import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar.js';
import { Banner } from './components/Banner/Banner.js';
import { About } from './components/About/About.js';
import { Skills } from './components/Skills/Skills.js';
import { Projects } from './components/Projects/Projects.js';
import { Footer } from './components/Footer/Footer.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Banner />
        <About />
        <Skills />
        <Projects />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
