import React from 'react';
import ScrollToTop from './scrolltotop';

const Footer = () => {
  return (
    <footer id="footer" className="footer-area">
      <div className="footer-widget">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="footer-content text-center">
                <figure className="quote">
                  <blockquote>
                    நீ யாராக இருந்தாலும் பரவாயில்லை.. நீ எண்ணுவது விண்மீனாக இருந்தாலும் உன் உழைப்பால்.. நீ எண்ணியது உன்னை வந்து சேரும்.. நீ நீயாக இரு..!
                  </blockquote>
                  <figcaption>
                    &mdash; ஏ பி ஜே, <cite>அப்துல் கலாம்</cite>
                  </figcaption>
                  <blockquote>
                    It doesn't matter who you are, if you wish to reach the sky, your hardwork will bring your wish to you.
                  </blockquote>
                  <figcaption>
                    &mdash; ABJ, <cite>Abdul Kalam</cite>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright-text text-center">
                <ScrollToTop />
                <p>Made with ❤ by <a href="https://github.com/yuvan11" target="_blank" rel="noreferrer">yuva</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;