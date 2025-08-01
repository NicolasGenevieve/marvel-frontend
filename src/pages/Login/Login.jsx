import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../../components/Tools/Input/Input";
import ButtonRed from "../../components/Tools/Buttons/ButtonRed";

const Login = ({ connexionStatus, redirectPath, setRedirectPath }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        { email: email, password: password }
      );
      //console.log(response.data);
      const token = response.data.token;
      if (token) {
        connexionStatus(token);

        if (redirectPath) {
          navigate(redirectPath);
          setRedirectPath(null);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error.response.data.message);
      if (
        error.response.data.message === "User not found" ||
        error.response.data.message === "Unauthorized"
      ) {
        setError("Email ou mot de passe incorrect");
      } else {
        setError("Une erreur est survenue, veuillez réessayer");
      }
    }
  };

  return (
    <div className="connectWrap">
      <form className="formConnexion" onSubmit={handleSubmit}>
        <p style={{ color: "white" }} className="title">
          Se connecter
        </p>

        <Input
          className="inputConnect"
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <Input
          className="inputConnect"
          id="password"
          type="password"
          placeholder="Mot de passe"
          name="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        {error ? <p className="error">{error}</p> : <></>}
        <ButtonRed title="Se connecter" size="smallRed" />

        <p
          style={{ color: "white" }}
          className="account"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Pas encore de compte ? Inscris-toi !
        </p>
      </form>
    </div>
  );
};

export default Login;
