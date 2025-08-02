import "./ButtonSimple.css";

const ButtonSimple = ({ title, onClick }) => {
  return (
    <button className="buttonSimple" onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonSimple;
