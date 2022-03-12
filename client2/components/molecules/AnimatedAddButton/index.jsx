import React from 'react'
import * as s from './styles'

export default function AnimatedAddButton({data, position}) {
  return (
    <s.IconButton onClick={data.toggleIcon} className={data.iconState} position={position}>
        <s.Icon className={data.iconState}></s.Icon>
        </s.IconButton>

  )
}
