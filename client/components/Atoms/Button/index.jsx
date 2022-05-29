import React from 'react'
import * as s from './styles'

export default function Button({handleOnClick, children, width, color}) {
  return (
    <s.Button onClick={handleOnClick} width={width} color={color}>{children}</s.Button>
  )
}
