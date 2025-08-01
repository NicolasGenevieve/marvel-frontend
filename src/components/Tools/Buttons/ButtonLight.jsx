import "./ButtonLight.css";

const ButtonLight = ({ title, size, type, onClick, disabled }) => {
  return (
    <button type={type} className={size} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default ButtonLight;
