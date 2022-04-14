import React from 'react'

class Opensource extends React.Component {
  render () {
    return (

          <section id="os" className="os-area pt-15 pb-130">
          <div className="container">
            
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="section-title text-center pb-25">
                  <h2 className="title">Open source Works</h2>
                  <p>An open source, a right place to learn & contribute</p>
                </div> 
              </div>
            </div> 
            <div className="row justify-content-center">
              <div className="col-lg-3 col-md-4 col-sm-4">
                <div className="single-os mt-30">
                  <div className="os-image">
                    <img src="assets/images/opensource/op-1.png" alt="opensource" />
                  </div>
                  <div className="os-content">
                    <h4 className="os-title"><a className="fs-5 text" href="https://dev.to/yuvan11/its-a-go-hacktoberfest-3c" target = "_blank" rel="noreferrer">HacktoberFest 2021</a></h4>
                    <span>Oct 5, 2021</span>
                  </div>
                </div> 
              </div>
            </div>
           

          </div> 
        </section>

      )
  }
}

export default Opensource