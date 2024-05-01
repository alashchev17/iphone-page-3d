import React from "react";
import * as THREE from "three";

type FunctionProps = {
  timeline: gsap.core.Timeline;
  model: React.MutableRefObject<THREE.Group<THREE.Object3DEventMap>>;
  rotation: number;
  firstElement: string;
  secondElement: string;
  animationProperties: gsap.TweenVars;
};

export const animateWithGsapTimeline = ({
  timeline,
  model,
  rotation,
  firstElement,
  secondElement,
  animationProperties,
}: FunctionProps) => {
  timeline
    .to(model.current.rotation, {
      y: rotation,
      duration: 1,
      ease: "power2.inOut",
    })
    .to(
      firstElement,
      {
        ...animationProperties,
        ease: "power2.inOut",
      },
      "<",
    )
    .to(
      secondElement,
      {
        ...animationProperties,
        ease: "power2.inOut",
      },
      "<",
    );
};
