import React, { useState, useEffect } from 'react';
import About from './components/about';
import Header from './components/header';
import Work from './components/work';
import Blog from './components/blog';
import Footer from './components/footer';
import Opensource from './components/opensource';
import Swags from './components/swags';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="preloader">
        <div className="loader_34">
          <div className="ytp-spinner">
            <div className="ytp-spinner-container">
              <div className="ytp-spinner-rotator">
                <div className="ytp-spinner-left">
                  <div className="ytp-spinner-circle" />
                </div>
                <div className="ytp-spinner-right">
                  <div className="ytp-spinner-circle" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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