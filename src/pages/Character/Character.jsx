import "./Character.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../components/Tools/Loader/Loader";
import Article from "../../components/Tools/Article/Article";
import Footer from "../../components/Footer/Footer";
import { Navigate } from "react-router-dom";
import Presentation from "../../components/Tools/Presentation/Presentation";
import handleAddToFavoritesCharacters from "../../Functions/HandleAddToFavorites/handleAddToFavoritesCharacters";

const Character = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comicDetails, setComicDetails] = useState([]);
  const [isFavoris, setIsFavoris] = useState(false);

  const { id } = useParams();

  const handleFavoris = async () => {
    try {
      await handleAddToFavoritesCharacters(data, token);
      setIsFavoris(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/character/${id}`,
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
    const fetchComics = async () => {
      try {
        if (data.comics && data.comics.length > 0) {
          const mappingComics = data.comics.map((id) =>
            axios.get(`http://localhost:3000/comics/comic/${id}`)
          );
          const responses = await Promise.all(mappingComics);
          const comicsData = responses.map((res) => res.data);
          setComicDetails(comicsData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchComics();
  }, [data.comics]);

  //console.log(comicDetails);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/favoris/characters",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response.data);

        const alreadyAdd = response.data.some((fav) => fav.characterId === id);
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
          <h1 className="titleCharacters">{data.name}</h1>
          <Presentation
            src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
            alt={data.name}
            title={data.name}
            descritpion={data.descritpion}
            navigation={"/characters"}
            titleLight="Retour aux personnages"
            onclickFav={handleFavoris}
            isFavoris={isFavoris}
          />

          <h3 className="titleComic">{`Comics de ${data.name}`}</h3>
          <div className="comicWrap">
            {comicDetails.map((comic) => {
              return (
                <Article
                  key={comic._id}
                  link={`/comics/comic/${comic._id}`}
                  src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  alt={comic.title}
                  title={comic.title}
                  description={comic.description}
                  className="card"
                />
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Character;
