import "./Input.css";

const Input = ({ id, type, placeholder, name, className, value, onChange }) => {
  return (
    <input
      id={id}
      className={className}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      autoComplete="off"
    />
  );
};

export default Input;
