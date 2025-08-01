import "./Comic.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../components/Tools/Loader/Loader";
import Footer from "../../components/Footer/Footer";
import Presentation from "../../components/Tools/Presentation/Presentation";

const Comic = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics/comic/${id}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  // console.log(data.name);

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <main>
        <div className="container">
          <h1 className="titleComic">{data.title}</h1>
          <Presentation
            src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
            alt={data.title}
            title={data.title}
            descritpion={data.descritpion}
            navigation="/comics"
            titleLight="Retour aux comics"
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Comic;
