import React, { Fragment, useState } from 'react'
import styled from '@emotion/styled'

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
  outline: none;
  -webkit-appearance: none;
`;


const useMoneda = (label, stateInicial, options) => {

    // State del custom hook
    const [state, setState] = useState(stateInicial)

    const SelectMoneda = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                defaultValue=""
                onChange={ e => setState(e.target.value)}
                value={state}
            >
                <option value="" disabled>Selecciona</option>
                {
                    options.map(option => (
                        <option 
                            key={option.codigo} 
                            value={option.codigo}
                        >
                            {option.nombre}
                        </option>
                    ))
                }
            </Select>
        </Fragment>
    )

    // Retornar state, interfaz y función que modifica el state
    return [state, SelectMoneda, setState]
}

export default useMoneda