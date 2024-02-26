import { useState } from "react"
import { Box } from 'react-feather'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
const options = [
  {
    name: "Menu",
    scroll: true,
    backdrop: false
  }
]

function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(true);


  return (
    <>

    
    <Offcanvas show={show} style={{ width: '11%', border: 'none' }}  {...props}>

      <Nav className="sidebar">.
      
      <div className="sidebar-header">
        
        <a href="/" className="sidebar-brand"> Veterinar<span>IA</span> </a>
      </div>
      <div className="sidebar-body">
        <ul className="nav">
          <li className="nav-item nav-category">Inicio</li>
          <li className="nav-item">
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
          </li>
        </ul>
      </div>  
    </Nav>
    </Offcanvas>
    </>
  )
  
}

function Menu(){
  return (
    <>
      {options.map((props, idx) => (
        <OffCanvasExample key={idx} {...props} />
      ))}
    </>
  )
}

export default Menu;