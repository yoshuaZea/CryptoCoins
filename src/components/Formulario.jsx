import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import axios from 'axios';

// Componentes
import Error from './Error'

// Importar hook
import useMoneda from '../hooks/useMoneda'
import useCriptomoneda from '../hooks/useCriptomoneda'

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  border: none;
  background-color: #66a2fe;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover{
      background-color: #326ac0;
      cursor: pointer;
  }
`;

const Formulario = ({setMoneda, setCriptomoneda}) => {

    // State listado criptomonedas
    const [listacripto, setListacripto] = useState([])
    const [error, setError] = useState(false)

    const MONEDAS = [
        {codigo: 'USD', nombre:'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre:'Peso Mexicano'},
        {codigo: 'EUR', nombre:'Euro'},
        {codigo: 'GBP', nombre:'Libra Esterlina'},
        {codigo: 'COD', nombre:'Peso Colombiano'}
    ]

    // Utilizar useMoneda
    const [ moneda, SelectMoneda ] = useMoneda('Elige tu moneda', '', MONEDAS)

    // Utilizar useCriptomoneda
    const [ criptomoneda, SelectCripto ] = useCriptomoneda('Elige tu criptomoneda', '', listacripto)

    // Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'

            const resultado = await axios.get(url)

            setListacripto(resultado.data.Data)
        }

        consultarAPI()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()

        // Validar campos están llenos
        if(moneda === '' || criptomoneda === ''){
            setError(true)
            return
        }
        // Pasar los datos al componente principal
        setError(false)
        setMoneda(moneda)
        setCriptomoneda(criptomoneda)
    }

    return ( 
        <form
            onSubmit={handleSubmit}
        >
            {
                error ? <Error mensaje='Todos los campos son obligatorios' /> : null
            }

            <SelectMoneda />
            <SelectCripto />
            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
    )
}
 
export default Formulario