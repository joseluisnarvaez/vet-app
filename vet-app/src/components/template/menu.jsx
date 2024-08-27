import { useEffect, useState, useCallback } from "react"
import { Box } from 'react-feather'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from "react-router-dom";
const options = [
  {
    name: "Menu",
    scroll: true,
    backdrop: false
  }
]

function OffCanvasExample({ name, ...props }) {


  return (

    
    <Offcanvas show={true} style={{ width: '11%', border: 'none' }}  {...props}>
      <Nav className="sidebar">.
          
          <div className="sidebar-header">
            
            <a href="/" className="sidebar-brand"> Veterinar<span>IA</span> </a>
          </div>
          <div className="sidebar-body">
            
            <ul className="nav">
            
              <NavLink className='nav-item'  to='/Dashboard'>
                <button
                  className="nav-link"
                  data-bs-toggle="collapse"
                  data-bs-target="#inicio"
                  aria-expanded="false"
                  aria-controls="inicio"
                >
                  <Box size={18} />
                  <span className="link-title">Dashboard</span>
                  <i className="link-arrow" data-feather="chevron-down"></i>
                </button>
                <div className="collapse" id="inicio">
                  <ul className="nav sub-menu">
                    <li className="nav-item">
                      <button className="nav-link">Lista de Productos</button>
                    </li>
                  </ul>
                </div>
              </NavLink>
              <NavLink className='nav-item'  to='/caja'>
                <button
                  className="nav-link"
                  data-bs-toggle="collapse"
                  data-bs-target="#inicio"
                  aria-expanded="false"
                  aria-controls="inicio"
                >
                  <Box size={18} />
                  <span className="link-title">Caja</span>
                  <i className="link-arrow" data-feather="chevron-down"></i>
                </button>
                <div className="collapse" id="inicio">
                  <ul className="nav sub-menu">
                    <li className="nav-item">
                      <button className="nav-link">Lista de Productos</button>
                    </li>
                  </ul>
                </div>
              </NavLink>

            </ul>
          </div>  
        </Nav>
    
    </Offcanvas>
  )
  
}

function Menu(){
  const [path, setPath] = useState(window.location.pathname);

  const protectedPath = useCallback(() => {
    console.log(path);
    return path !== "/";
  }, [path]);

  useEffect(() => {
    setPath(window.location.pathname)
    protectedPath()
}, [path,protectedPath]);
  
  return (
    <>
      {protectedPath() && options.map((props, idx) => (
        <OffCanvasExample key={idx} {...props} />
      ))}
    </>
  )
}

export default Menu;