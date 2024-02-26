import { useEffect, useState } from 'react'
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import axios from 'axios'
import { Modal } from 'react-bootstrap'


const SearchTextComponente = ({url, setParametros, formulario}) =>{

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    
    const ModalContent = ({ selectedOption }) =>{
        return (
          <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedOption.titleModal}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
             { selectedOption.formulario.map((form, index) => (

                form.type !== "hidden" && (
                    <div className="mt-3">
                      <label key={index} className="tx-11 fw-bolder mb-0 text-uppercase">
                          {form.label}
                      </label>
                          : <p className="text-muted">{form.value}</p>
                    </div>
                )
              )
              )
              }
            </Modal.Body>
          </Modal>
        )
      }
      const handleSelect = (option) => {
          if(Array.isArray(option) && option.length > 0){
            setParametros(option[0],formulario)
            setSelectedOption(formulario);
            setIsModalOpen(true);
          }
       
     }
    const handleSearch = async (query) => {
      if (!query.length) {
        return;
      }
      const consultaURL = `${url}/searchName/${query}`;
      console.log(consultaURL);
      setIsLoading(true);
      try{
        const response = await axios.get(consultaURL);
        const { data } = response;
        console.log(data);
        setOptions(data);
        setIsLoading(false);
      } catch (error){
        console.error(error);
      }
    }
    useEffect(() => {
        if (isModalOpen) {
            // Realiza operaciones asíncronas aquí después de que el modal esté abierto
        }
    }, [isModalOpen]);
  
    // Bypass client-side filtering by returning `true`. Results are already
    // filtered by the search endpoint, so no need to do it again.
    const filterBy = () => true;
  
    return (
      <>
        <AsyncTypeahead
          filterBy={filterBy}
          id="async-example"
          isLoading={isLoading}
          labelKey="nombre"
          minLength={3}
          onSearch={handleSearch}
          options={options}
          placeholder="Buscar ....."
          className='form-control typeahead no-border'
          onChange={selected => {
            handleSelect(selected)
          }}
          renderMenuItemChildren={(option,idx) => (
            <>
              <span key={idx}>{option.nombre}</span>
            </>
          )}
        />
        {isModalOpen && <ModalContent selectedOption={selectedOption} />}
      </>
    );
  };
export default SearchTextComponente;