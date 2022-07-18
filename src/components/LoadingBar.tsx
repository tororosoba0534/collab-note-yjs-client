import { LoadingCircleSvg } from "./LoadingCircleSvg";

export const LoadingBar = (props: { text: string }) => {
  return (
    <div className="w-full  flex flex-row justify-center items-center gap-1">
      <span className="w-5 h-5 inline-block">
        <LoadingCircleSvg />
      </span>
      <span>{props.text}</span>
    </div>
  );
};
