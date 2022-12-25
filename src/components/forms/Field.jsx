const Field = ({ children, label, error }) => {
  return (
    <div className="text-lg text-white font-semibold flex flex-col">
      <div className="mb-[5px] cursor-default">{label}</div>
      {children}
      {error && <div className="text-red-500 text-base font-bold">{error}</div>}
    </div>
  );
};

export default Field;
