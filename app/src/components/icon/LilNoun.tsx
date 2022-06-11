import * as React from 'react'
import { Icon, IconProps } from '@chakra-ui/react'

export function LilNoun(props: IconProps) {
  return (
    <Icon viewBox="0 0 290 90" {...props}>
      <title>{'logo'}</title>
      <g fill="none" fillRule="evenodd">
        <path
          fill="#FFFF"
          d="M0 50h40v20H20v20H0zM60 50h20v40H40V70h20zM130 90H90V50h40zM180 50h20v40h-60V50h20v20h20zM210 50h40v20h-20v20h-20zM270 50h20v40h-40V70h20V50Z"
        />
        <path fill="#FF638D" d="M20 20h20v20H0V0h20z" />
        <path fill="#FFEF16" d="M50 0h20v40H50z" />
        <path fill="#2B83F6" d="M100 20h20v20H80V0h20z" />
      </g>
    </Icon>
  )
}
