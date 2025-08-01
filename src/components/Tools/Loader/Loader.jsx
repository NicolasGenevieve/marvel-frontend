import "./Loader.css";
import { BounceLoader } from "react-spinners";

const Loader = () => {
  return (
    <section className="load">
      <div className="loadWrap">
        <BounceLoader color="#ee171f" />
      </div>
    </section>
  );
};

export default Loader;
