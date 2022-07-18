import { LoadingCircleSvg } from "./LoadingCircleSvg";

const Loading = () => {
  console.log("Loading rendered");
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <div className="flex text-center w-full">
        <span className="w-5 h-5 inline-block">
          <LoadingCircleSvg />
        </span>
        <span>Now Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
