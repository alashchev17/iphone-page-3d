import React, { Suspense } from "react";
import * as THREE from "three";
import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";

import Lights from "./Lights";
import ModelLoader from "./ModelLoader";
import IPhone from "./IPhone";

type ModelViewProps = {
  index: number;
  groupRef: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  gsapType: string;
  controlRef: React.MutableRefObject<OrbitControls>;
  setRotationState: React.Dispatch<React.SetStateAction<number>>;
  item: {
    id: number;
    title: string;
    color: string[];
    img: string;
  };
  size: string;
};

const ModelView = ({
  index,
  groupRef,
  gsapType,
  controlRef,
  setRotationState,
  item,
  size,
}: ModelViewProps) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
    >
      <ambientLight intensity={0.3} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />

      <OrbitControls
        ref={controlRef}
        makeDefault
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      <group
        ref={groupRef}
        position={[0, 0, 0]}
        name={index === 1 ? "small" : "large"}
      >
        <Suspense fallback={<ModelLoader />}>
          <IPhone
            scale={index === 1 ? [14, 14, 14] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View>
  );
};

export default ModelView;
