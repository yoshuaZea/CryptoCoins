import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import imagen from './cryptomonedas.png'
import axios from 'axios'

// Componentes
import Formulario from './components/Formulario'
import Cotizacion from './components/Cotizacion'
import Spinner from './components/Spinner'

// Styled components
const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }

`;


function App() {

  // Main state
  const [moneda, setMoneda] = useState('')
  const [criptomoneda, setCriptomoneda] = useState('')
  const [cotizacion, setCotizacion] = useState({})
  const [spinner, setSpinner] = useState(false)

  useEffect(() => {
    const cotizarCriptomoneda = async () => {
      // Evitar la primer ejecución
      if(moneda === '') return


      // Consultar API para obtener cotización
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

      const cotizacion = await axios.get(url)

      // Mostrar spinner
      setSpinner(true)

      
      setTimeout(() => {
        // Guardar cotización
        setCotizacion(cotizacion.data.DISPLAY[criptomoneda][moneda])
        // Ocultar spinner
        setSpinner(false)
      }, 3000)
    }
    
    cotizarCriptomoneda()

  }, [moneda, criptomoneda])

  // Carga condicinonal de componentes
  const componente = (spinner) ? <Spinner /> : <Cotizacion cotizacion={cotizacion} />

  return(
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt="Imagen crypto"
        />
      </div>
      <div>
        <Heading>Cotiza criptomonedas al instante!</Heading>
        <Formulario 
          setMoneda={setMoneda}
          setCriptomoneda={setCriptomoneda}
        />
        { componente }
      </div>
    </Contenedor>
  );
}

export default App;
