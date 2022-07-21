export const SubmitMsgBar = (props: { submitMsg: string }) => {
  return (
    <div className="w-full rounded-md bg-red-400 text-white font-bold text-center px-1">
      {props.submitMsg}
    </div>
  );
};
