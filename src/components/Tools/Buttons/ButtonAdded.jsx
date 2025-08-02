import "./ButtonAdded.css";
import { FaHeart } from "react-icons/fa";

const ButtonAdded = () => {
  return (
    <button disabled className="buttonAdded">
      <FaHeart />
      Déjà ajouté aux favoris
    </button>
  );
};

export default ButtonAdded;
