import "./Characters.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Tools/Loader/Loader";
import Finder from "../../components/Tools/Finder/Finder";
import Filters from "../../components/Tools/Filters/Filters";
import Article from "../../components/Tools/Article/Article";
import Footer from "../../components/Footer/Footer";
import { Navigate } from "react-router-dom";

const Characters = ({ token }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(100);
  const [totalCount, setTotalCount] = useState(0);
  const [results, setResults] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skip = (page - 1) * limit;
        const response = await axios.get(
          `http://localhost:3000/characters?&name=${name}&skip=${skip}&limit=${limit}`
        );
        setData(response.data);
        setTotalCount(response.data.count);
        setResults(response.data?.results || []);
        setIsLoading(false);
        // console.log(skip);
        // console.log(response.data.results);
        // console.log(response.data);
        // console.log(response.data.count);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [limit, name, page]);

  const totalPages = Math.ceil(totalCount / limit);

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
          <h1 className="titleCharacters">Liste des personnages</h1>
          <div className="filterWrap">
            <Filters setPage={setPage} page={page} totalPages={totalPages} />
            <Finder
              type="characters"
              title={name}
              setTitle={setName}
              setPage={setPage}
              placeholder="Rechercher un personnage..."
              searchKey="name"
            />
          </div>
          <div className="cardWrap">
            {results.map((character) => {
              return (
                <Article
                  key={character._id}
                  link={`/characters/${character._id}`}
                  src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                  alt={character.name}
                  title={character.name}
                  description={character.description}
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

export default Characters;
