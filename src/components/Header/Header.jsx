import "./Header.css";
import Brand from "./Brand";
import ButtonRed from "../Tools/Buttons/ButtonRed";
import ButtonLight from "../Tools/Buttons/ButtonLight";
import ButtonSimple from "../Tools/Buttons/ButtonSimple";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";

const Header = ({ token, connexionStatus }) => {
  const navigate = useNavigate();
  return (
    <>
      <header>
        <div className="container">
          <div className="headerWrap">
            <Brand />
            <div className="buttonWrap">
              {token ? (
                <>
                  <ButtonSimple
                    title="Les Personnages"
                    onClick={() => {
                      navigate("/characters");
                    }}
                  />
                  <ButtonSimple
                    title="Les Comics"
                    onClick={() => {
                      navigate("/comics");
                    }}
                  />
                  <ButtonLight
                    title="Mes Favoris"
                    size="smallLight"
                    icon={<FaHeart />}
                    onClick={() => {
                      navigate("/favoris");
                    }}
                  />
                  <ButtonRed
                    title="Se déconnecter"
                    size="smallRed"
                    icon={<FaPowerOff />}
                    onClick={() => {
                      connexionStatus(null);
                    }}
                  />
                </>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
