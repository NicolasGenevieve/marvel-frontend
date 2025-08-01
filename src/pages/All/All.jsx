import { Link } from "react-router-dom";

const All = () => {
  return (
    <main>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <p style={{ fontWeight: "900", fontSize: "30px" }}>
          Aucun super héros par ici !
        </p>
        <Link style={{ color: "white" }} to="/">
          Retour à l'accueil
        </Link>
      </div>
    </main>
  );
};

export default All;
