import React from 'react';
import About from './components/about';
import Header from './components/header';
import Work from './components/work';
import Blog from './components/blog';
import Footer from './components/footer';
import Opensource from './components/opensource';
import Swags from './components/swags';

const Home = () => {
  return (
    <div>
      <Header />
      <About />
      <Work />
      <Opensource />
      <Swags />
      <Blog />
      <Footer />
    </div>
  );
};

export default Home;