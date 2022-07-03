export const FloatingLabelInput = (props: {
  label: string;
  type: "text" | "password";
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
  return (
    <div className="relative h-12 w-full">
      <input
        className="peer absolute bottom-0 z-10 bg-white/0 border-gray-300 border-2 w-full h-9 rounded-md px-2 focus:outline-none focus:border-rose-600 placeholder-transparent"
        type={props.type}
        placeholder="invisible but needed"
        value={props.value}
        onChange={props.onChange}
      />
      <label className="absolute left-2 top-0 text-gray-600 text-sm peer-focus:top-0 z-10  bg-white px-1 peer-focus:z-10  peer-focus:text-gray-600 peer-focus:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:z-0 transition-all">
        {props.label}
      </label>
    </div>
  );
};
