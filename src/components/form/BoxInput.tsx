export const BoxInput = (props: {
  label: string;
  type: "text" | "password";
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}) => {
  return (
    <div className="relative">
      <input
        className="border-2 border-solid border-gray-300 rounded-md p-1"
        type={props.type}
        value={props.value}
        onChange={props.onChange}
      />
      <span className="absolute left-2 -top-4 pr-1 pl-1 bg-white">
        {props.label}
      </span>
    </div>
  );
};
