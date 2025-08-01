import "./ButtonRed.css";

const ButtonRed = ({ title, size, type, onClick, disabled, icon }) => {
  return (
    <button type={type} className={size} onClick={onClick} disabled={disabled}>
      {icon}
      {title}
    </button>
  );
};

export default ButtonRed;
