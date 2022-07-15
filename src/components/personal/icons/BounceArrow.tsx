export const BounceArrow = () => {
  return (
    <svg viewBox="0 0 100 100" className="animate-bounce">
      <circle cx="50" cy="50" r="40" fill="green" />
      <path d="M 50 25 V 65" stroke="white" strokeWidth="10" />
      <path
        d="M 30 50 L 50 70 L 70 50"
        stroke="white"
        strokeWidth="10"
        fill="none"
      />
    </svg>
  );
};
