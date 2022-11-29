import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17.81}
      height={15.998}
      viewBox="0 0 17.81 15.998"
      {...props}
    >
      <G data-name="Group 58">
        <G data-name="Group 57" fill={props.fill} stroke="#000" strokeWidth={1}>
          <Path
            data-name="Icon awesome-ticket-alt"
            d="M12.7 4.449a1.134 1.134 0 001.15 1.113v2.224A1.134 1.134 0 0112.7 8.9H1.154A1.134 1.134 0 010 7.786V5.562a1.113 1.113 0 100-2.225V1.112A1.134 1.134 0 011.154 0H12.7a1.134 1.134 0 011.15 1.112v2.225a1.134 1.134 0 00-1.15 1.112z"
            transform="translate(-253.835 -763.853) rotate(30 -1297.16 865.509)"
          />
          <Path
            data-name="Path 83"
            d="M10.402 0v9.033"
            transform="translate(-253.835 -763.853) rotate(30 -1297.16 865.509)"
          />
        </G>
      </G>
    </Svg>
  )
}

export default SvgComponent
