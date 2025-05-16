import React from "react";
import "aframe";

const LayoutGraphic = ({ apt_number }) => {
  console.log(apt_number);
  return (
    <div>
      <p>3D план объекта:</p>
      <a-scene embedded style={{ width: "300px", height: "200px" }}>
        <a-entity camera look-controls position="0 2.6 4"></a-entity>
        <a-entity
          gltf-model={`/apt_layouts/${apt_number}.glb`}
          position="0 0 0"
          scale="1 1 1"
        ></a-entity>
      </a-scene>
    </div>
  );
};

export default LayoutGraphic;
