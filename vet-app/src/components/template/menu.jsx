import { useState } from "react"
import { Box } from 'react-feather'
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
const options = [
  {
    name: "Menu",
    scroll: true,
    backdrop: false
  }
]

function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     <div className="contenedor">
      <Button className="boton-esquina" variant="primary" onClick={handleShow}>
        Menu     </Button>
    </div>
    
    
    <Offcanvas show={show} onHide={handleClose}  style={{ width: '13%' }}  {...props}>

      <Nav className="sidebar">.
      
      <div className="sidebar-header">
        
        <a href="/" className="sidebar-brand"> Veterinar<span>IA</span> </a>
        <Offcanvas.Header  closeButton style={{marginLeft : '19%'}} >
        <Offcanvas.Title>
        </Offcanvas.Title>
      </Offcanvas.Header>
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