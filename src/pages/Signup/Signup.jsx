import "./Signup.css";
import { useNavigate } from "react-router-dom";
import ButtonRed from "../../components/Tools/Buttons/ButtonRed";
import Input from "../../components/Tools/Input/Input";
import { useState } from "react";
import axios from "axios";

const Signup = ({ connexionStatus }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError(null);
      const response = await axios.post("http://localhost:3000/user/signup", {
        email: email,
        username: username,
        password: password,
      });
      console.log("réponse du serveur", response.data);

      const token = response.data.token;
      if (token) {
        connexionStatus(token);
        navigate("/");
      } else {
        setError("Une erreur est survenue, veuillez réessayer");
      }
    } catch (error) {
      console.log(error.response.data);
      console.log(error);
      if (error.response?.data === "Veuillez entrer un username") {
        setError("Veuillez entrer un username");
      } else if (error.response?.data === "Veuillez entrer un email valide") {
        setError("Veuillez entrer un email valide");
      } else if (
        error.response?.data === "Veuillez entrer un mot de passe valide"
      ) {
        setError("Veuillez entrer un mot de passe valide");
      } else {
        setError("Une erreur est survenue, veuillez réessayer");
      }
    }
  };

  return (
    <div className="connectWrap">
      <form className="formConnexion" onSubmit={handleSubmit}>
        <p style={{ color: "white" }} className="title">
          S'inscrire
        </p>
        <Input
          className="inputConnect"
          id="username"
          type="text"
          placeholder="Nom d'utilisateur"
          name="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

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
        <div className="buttonWraping">
          <ButtonRed title="S'inscrire" size="smallRed" />
        </div>
        <p
          style={{ color: "white" }}
          className="account"
          onClick={() => {
            navigate("/login");
          }}
        >
          Déjà un compte ? Connecte-toi !
        </p>
      </form>
    </div>
  );
};

export default Signup;
