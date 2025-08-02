import "./Comic.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../components/Tools/Loader/Loader";
import Footer from "../../components/Footer/Footer";
import { Navigate } from "react-router-dom";
import Presentation from "../../components/Tools/Presentation/Presentation";
import handleAddToFavoritesComics from "../../Functions/HandleAddToFavorites/handleAddToFavoritesComics";

const Comic = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFavoris, setIsFavoris] = useState(false);

  const { id } = useParams();

  const handleFavoris = async () => {
    try {
      await handleAddToFavoritesComics(data, token);
      setIsFavoris(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/comics/comic/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
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

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/favoris/comics",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);

        const alreadyAdd = response.data.some((fav) => fav.comicId === id);
        setIsFavoris(alreadyAdd);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFavorites();
  }, [id, token]);

  if (!token) {
    return <Navigate to="/login" />;
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
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
            onclickFav={handleFavoris}
            isFavoris={isFavoris}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Comic;
