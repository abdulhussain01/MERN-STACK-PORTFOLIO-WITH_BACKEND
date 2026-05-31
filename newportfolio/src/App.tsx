

import Hero from './components/Hero';
// import Stats from './components/Stats';
import Projects from './components/Projects';
import About from './components/About';
// import Services from './components/Services';
import Resume from './components/Resume';
import Contact from './components/Contact';
const App = () => {
  return (
    <main className='flex flex-col container mx-auto p-10 md:max-w-4xl lg:pr-10 lg:pl-0 lg:max-w-6xl'>
      <Hero />
      {/* <Stats /> */}
      <Projects />
      <About/>
      {/* <Services/> */}
      <Resume/>
      <Contact/>
    </main>
  );
};

export default App;
