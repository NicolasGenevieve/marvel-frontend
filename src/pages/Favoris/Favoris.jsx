import "./Favoris.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Tools/Loader/Loader";
import Article from "../../components/Tools/Article/Article";
import Footer from "../../components/Footer/Footer";
import { FaTrashAlt } from "react-icons/fa";
import handleDeleteComic from "../../Functions/HandleDeleteFavoris/handleDeleteComic";
import handleDeleteCharacter from "../../Functions/HandleDeleteFavoris/handleDeleteCharacter";
import { Navigate } from "react-router-dom";

const Favoris = ({ token }) => {
  const [comics, setComics] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsername(response.data.username);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };

    fetchUsername();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/favoris/comics`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setComics(response.data);
        setIsLoading(false);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/favoris/characters`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCharacters(response.data);
        setIsLoading(false);
        //console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token]);

  const deleteComic = async (id) => {
    try {
      await handleDeleteComic(id, setComics, token);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCharacter = async (id) => {
    try {
      await handleDeleteCharacter(id, setCharacters, token);
    } catch (error) {
      console.log(error);
    }
  };

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
          <h1 className="titleCharacters">{`Hello ${username} !`}</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "30px",
            }}
          >
            <p style={{ fontSize: "16px" }}>Voici la liste de tes favoris :</p>
          </div>
          <div>
            <p
              style={{ fontSize: "30px", color: "white", marginBottom: "40px" }}
            >
              Tes Comics Favoris :
            </p>
          </div>
          {comics.length === 0 ? (
            <p
              style={{
                color: "gray",
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              Aucun comic ajouté en favoris pour le moment.
            </p>
          ) : (
            <div className="favorisWrap">
              {comics.map((comic) => {
                return (
                  <div className="favWrap">
                    <Article
                      key={comic._id}
                      src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                      alt={comic.title}
                      title={comic.title}
                      description={comic.description}
                      className="cardStatic"
                    />
                    <div className="trashWrap">
                      <FaTrashAlt
                        className="trash"
                        onClick={() => deleteComic(comic._id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div>
            <p
              style={{
                fontSize: "30px",
                color: "white",
                marginBottom: "40px",
                marginTop: "80px",
              }}
            >
              Tes Persos Favoris :
            </p>
          </div>
          {characters.length === 0 ? (
            <p
              style={{
                color: "gray",
                textAlign: "center",
                marginBottom: "40px",
              }}
            >
              Aucun personnage ajouté en favoris pour le moment.
            </p>
          ) : (
            <div className="favorisWrap">
              {characters.map((character) => {
                return (
                  <div className="favWrap">
                    <Article
                      key={character._id}
                      src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                      alt={character.name}
                      title={character.name}
                      description={character.description}
                      className="cardStatic"
                    />
                    <div className="trashWrap">
                      <FaTrashAlt
                        className="trash"
                        onClick={() => deleteCharacter(character._id)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Favoris;
