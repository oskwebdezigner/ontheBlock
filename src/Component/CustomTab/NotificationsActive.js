import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15.403}
      height={17}
      viewBox="0 0 15.403 17"
      {...props}
    >
      <G
        data-name="Group 236"
        fill="#000"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      >
        <Path
          data-name="Path 78"
          d="M16.5 7.8a4.8 4.8 0 10-9.6 0c0 5.6-2.4 7.2-2.4 7.2h14.4s-2.4-1.6-2.4-7.2"
          transform="translate(-4 -2.5)"
        />
        <Path
          data-name="Path 79"
          d="M13.085 18.203a1.6 1.6 0 01-2.768 0"
          fill="none"
          transform="translate(-4 -2.5)"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
