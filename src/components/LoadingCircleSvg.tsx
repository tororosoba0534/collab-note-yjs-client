export const LoadingCircleSvg = () => {
  return (
    <svg viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="10"
        strokeDasharray="126"
      />
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="10"
        strokeDasharray="126"
        strokeDashoffset="126"
      />
    </svg>
  );
};
