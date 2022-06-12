export const FloatingLabelInput = (props: {
  label: string;
  type: "text" | "password";
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
  return (
    <div className="relative h-14">
      <input
        className="peer relative top-3.5 bg-white/0 border-gray-300 border-b-2 w-full focus:outline-none focus:border-rose-600 placeholder-transparent"
        type={props.type}
        placeholder="invisible but needed"
        value={props.value}
        onChange={props.onChange}
      />
      <label className="absolute left-0 peer-focus:top-0  transition-all peer-focus:text-gray-600 peer-focus:text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 -z-10">
        {props.label}
      </label>
    </div>
  );
};
