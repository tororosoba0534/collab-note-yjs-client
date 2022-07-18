import { LoadingBar } from "./LoadingBar";

export const LoadingPage = () => {
  console.log("Loading rendered");
  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <LoadingBar text="Now loading..." />
    </div>
  );
};
