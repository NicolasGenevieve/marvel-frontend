import "./Character.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../../components/Tools/Loader/Loader";
import Article from "../../components/Tools/Article/Article";
import Footer from "../../components/Footer/Footer";
import { Navigate } from "react-router-dom";
import Presentation from "../../components/Tools/Presentation/Presentation";

const Character = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [comicDetails, setComicDetails] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/character/${id}`
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
