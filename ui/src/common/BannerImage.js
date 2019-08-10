import React from "react";
import main from "./us cute.jpg"; // Tell Webpack this JS file uses this image

function BannerImage(props) {
  // Import result is the URL of your image
  return <img src={main} alt="main_image" width={props.width} height={props.height} />;
}

export default BannerImage;
