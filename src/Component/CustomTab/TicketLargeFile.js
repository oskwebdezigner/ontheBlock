import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={68.265}
      height={60.891}
      viewBox="0 0 68.265 60.891"
      {...props}
    >
      <G data-name="Group 58">
        <G data-name="Group 57" fill="none" stroke="#000" strokeWidth={1}>
          <Path
            data-name="Icon awesome-ticket-alt"
            d="M51.651 18.1a4.613 4.613 0 004.7 4.525v9.051a4.613 4.613 0 01-4.7 4.525H4.7A4.613 4.613 0 010 31.677v-9.05a4.528 4.528 0 100-9.051V4.525A4.613 4.613 0 014.7 0h46.951a4.613 4.613 0 014.7 4.525v9.051a4.613 4.613 0 00-4.7 4.524z"
            transform="translate(-254.042 -763.853) rotate(30 -1290.23 891.368)"
          />
          <Path
            data-name="Path 83"
            d="M42.318 0v36.751"
            transform="translate(-254.042 -763.853) rotate(30 -1290.23 891.368)"
          />
        </G>
      </G>
    </Svg>
  )
}

export default SvgComponent
