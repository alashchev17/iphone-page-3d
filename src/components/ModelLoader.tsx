import { Html } from "@react-three/drei";

const ModelLoader = () => {
  return (
    <Html>
      <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center">
        <div className=" text-sm font-light text-center">Loading...</div>
      </div>
    </Html>
  );
};

export default ModelLoader;
