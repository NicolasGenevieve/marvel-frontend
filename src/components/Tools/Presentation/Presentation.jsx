import "./Presentation.css";
import ButtonLight from "../Buttons/ButtonLight";
import ButtonRed from "../Buttons/ButtonRed";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ButtonAdded from "../Buttons/ButtonAdded";

const Presentation = ({
  src,
  alt,
  title,
  description,
  navigation,
  titleLight,
  onclickFav,
  isFavoris,
}) => {
  const navigate = useNavigate();

  return (
    <div className="presWrap">
      <div className="presImg">
        <img src={src} alt={alt} />
      </div>
      <div className="presDesc">
        <h2 className="presTitle">{title}</h2>
        <span className="presDescription">{description}</span>
        <div style={{ display: "flex", gap: "10px" }}>
          {isFavoris ? (
            <ButtonAdded />
          ) : (
            <ButtonRed
              title="Ajouter aux favoris"
              size="smallRed"
              icon={<FaHeart />}
              onClick={onclickFav}
            />
          )}

          <ButtonLight
            title={titleLight}
            size="smallLight"
            onClick={() => {
              navigate(navigation);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Presentation;
