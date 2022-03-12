import React from 'react'
import * as s from './styles'

export default function AnimatedAddButton({handleOnClick, iconState, position}) {
  return (
    <s.IconButton onClick={handleOnClick} className={iconState} position={position}>
        <s.Icon className={iconState}></s.Icon>
        </s.IconButton>

  )
}
