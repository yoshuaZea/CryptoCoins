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

const useCriptomoneda = (label, stateInicial, options) => {

    // State del custom hook
    const [state, setState] = useState(stateInicial)

    const SelectCripto = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={ e => setState(e.target.value)}
                value={state}
            >
                <option value="" disabled>Selecciona</option>
                {
                    options.map(option => (
                        <option 
                            key={option.CoinInfo.Id} 
                            value={option.CoinInfo.Name}
                        >
                            {option.CoinInfo.FullName}
                        </option>
                    ))
                }
            </Select>
        </Fragment>
    )

    // Retornar state, interfaz y función que modifica el state
    return [state, SelectCripto, setState]
}

export default useCriptomoneda