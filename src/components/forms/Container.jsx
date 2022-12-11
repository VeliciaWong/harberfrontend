const FormContainer = ({ children, title }) => {
  return (
    <div className="px-12 gap-[2rem]">
      <div className="w-full">{children}</div>
    </div>
  );
};

export default FormContainer;
