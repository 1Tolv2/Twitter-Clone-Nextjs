import React from 'react'
import * as s from './styles'

export default function AnimatedAddButton({phone, data, position}) {
  return (
    <s.IconButton phone onClick={data.toggleIcon} className={data.iconState} position={position}>
        <s.Icon className={data.iconState}></s.Icon>
        </s.IconButton>

  )
}
