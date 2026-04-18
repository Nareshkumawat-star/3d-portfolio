import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();
  
  return (
    <Html
      as='div'
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <span className='canvas-loader mb-4'></span>
        <div className="w-[120px] h-[4px] bg-tertiary rounded-full overflow-hidden relative border border-white/10">
          <div 
            className="absolute top-0 left-0 h-full bg-[#915eff] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p
          className="mt-2 text-[#f1f1f1] font-bold text-[14px]"
        >
          {progress.toFixed(0)}%
        </p>
      </div>
    </Html>
  );
};

export default CanvasLoader;
