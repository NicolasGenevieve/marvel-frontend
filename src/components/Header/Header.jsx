import "./Header.css";
import Brand from "./Brand";
import ButtonRed from "../Tools/Buttons/ButtonRed";
import ButtonLight from "../Tools/Buttons/ButtonLight";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <div className="container">
          <div className="headerWrap">
            <Brand />
            <div className="buttonWrap">
              <ButtonRed
                title="Se connecter"
                size="smallRed"
                onClick={() => {
                  navigate("/login");
                }}
              />
              <ButtonLight
                title="S'inscrire"
                size="smallLight"
                onClick={() => {
                  navigate("/signup");
                }}
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
