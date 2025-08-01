import "./Header.css";
import Brand from "./Brand";
import ButtonRed from "../Tools/Buttons/ButtonRed";
import ButtonLight from "../Tools/Buttons/ButtonLight";

const Header = () => {
  return (
    <>
      <header>
        <div className="container">
          <div className="headerWrap">
            <Brand />
            <div className="buttonWrap">
              <ButtonRed title="Se connecter" size="smallRed" />
              <ButtonLight title="S'inscrire" size="smallLight" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
