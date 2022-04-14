import React,{ useState } from 'react'

const Navbar = props => {

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

         return ( 

          <div className="navigation fixed-top">
            
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <nav className="navbar navbar-expand-lg navbar-light  rounded">
                    <a className="navbar-brand" href="/">
                  
                    </a>
                    <button className="custom-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navbars" aria-controls="navbars" aria-expanded={!isNavCollapsed ? true : false} aria-label="Toggle navigation" onClick={handleNavCollapse}>
                      <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbars">
                      <ul className="navbar-nav ml-auto">
                        <li className="nav-item"><a className="page-scroll" href="#home">Home</a></li>
                        <li className="nav-item"><a className="page-scroll" href="#about">About</a></li>
                        <li className="nav-item"><a className="page-scroll" href="#work">Portfolio</a></li>
                        <li className="nav-item"><a className="page-scroll" href="#blog">Blog</a></li>
                        
                      </ul>
                    </div>
                  </nav>
                </div>
              </div> 
            </div> 
          </div>
          )

  }



export default Navbar