import "./Home.css";
import video from "../../assets/Marvel_Opening_Theme.mp4";
import ButtonRed from "../../components/Tools/Buttons/ButtonRed";
import ButtonLight from "../../components/Tools/Buttons/ButtonLight";
import { useNavigate } from "react-router-dom";

const Home = ({ token, setRedirectPath }) => {
  const navigate = useNavigate();
  return (
    <div className="hero">
      <video autoPlay muted playsInline className="background-video">
        <source src={video} type="video/mp4" />
      </video>
      <div className="container">
        <div className="heroWrap">
          <h1 className="titleHome">Découvrez l'univers de MARVEL</h1>
          <div className="buttonWrap">
            <ButtonRed
              title="Les Personnages"
              size="bigRed"
              onClick={() => {
                if (token) {
                  navigate("/characters");
                } else {
                  setRedirectPath("/characters");
                  navigate("/login");
                }
              }}
            />
            <ButtonLight
              title="Les Comics"
              size="bigLight"
              onClick={() => {
                if (token) {
                  navigate("/comics");
                } else {
                  setRedirectPath("/comics");
                  navigate("/login");
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
