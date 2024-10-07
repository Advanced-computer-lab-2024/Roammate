const Input = ({ label, type, value, setValue, required, disabled }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        required={required}
        className={required && !value ? "error" : ""}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
