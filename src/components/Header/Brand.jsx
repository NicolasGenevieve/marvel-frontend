import "./Brand.css";
import logo from "../../../src/assets/logo.png";

const Brand = () => {
  return (
    <div className="brand">
      <img
        src={logo}
        alt="Logo Marvel"
        onClick={() => {
          window.location.href = "/";
        }}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default Brand;
