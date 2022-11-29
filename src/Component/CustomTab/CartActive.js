import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={17.762}
      height={17}
      viewBox="0 0 17.762 17"
      {...props}
    >
      <G
        data-name="Icon feather-shopping-cart"
        fill="#000"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      >
        <Path
          data-name="Path 84"
          d="M8.357 16.738a.762.762 0 11-.762-.762.762.762 0 01.762.762z"
          transform="translate(-1 -1)"
        />
        <Path
          data-name="Path 85"
          d="M16.738 16.738a.762.762 0 11-.762-.762.762.762 0 01.762.762z"
          transform="translate(-1 -1)"
        />
        <Path
          data-name="Path 86"
          d="M1.5 1.5h3.048L6.59 11.7a1.524 1.524 0 001.524 1.227h7.406a1.524 1.524 0 001.523-1.227l1.219-6.39H5.4L4.548 1.5z"
          transform="translate(-1 -1)"
        />
      </G>
    </Svg>
  )
}

export default SvgComponent
