import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={15.4}
      height={17}
      viewBox="0 0 15.4 17"
      {...props}
    >
      <G
        data-name="Icon feather-home"
        fill="none"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      >
        <Path
          data-name="Path 76"
          d="M4.5 8.6L11.7 3l7.2 5.6v8.8a1.6 1.6 0 01-1.6 1.6H6.1a1.6 1.6 0 01-1.6-1.6z"
          transform="translate(-4 -2.5)"
        />
        <Path
          data-name="Path 77"
          d="M9.3 19v-8h4.8v8"
          transform="translate(-4 -2.5)"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
