import "./Comics.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/Tools/Loader/Loader";
import Finder from "../../components/Tools/Finder/Finder";
import Filters from "../../components/Tools/Filters/Filters";
import Article from "../../components/Tools/Article/Article";
import Footer from "../../components/Footer/Footer";
import ButtonRed from "../../components/Tools/Buttons/ButtonRed";
import { Navigate } from "react-router-dom";

const Comics = ({ token }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(100);
  const [totalCount, setTotalCount] = useState(0);
  const [title, setTitle] = useState("");
  const [goToPage, setGoToPage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const skip = (page - 1) * limit;
        const encodedTitle = encodeURIComponent(title);
        const response = await axios.get(
          `http://localhost:3000/comics?&title=${encodedTitle}&skip=${skip}&limit=${limit}`
        );
        setData(response.data);
        setTotalCount(response.data.count);
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
  }, [limit, title, page]);

  const handleGoToPage = () => {
    const num = parseInt(goToPage, 10);
    if (!isNaN(num) && num >= 1 && num <= totalPages) {
      setPage(num);
    } else {
      alert(`Numéro de page invalide (entre 1 et ${totalPages})`);
    }
  };

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
          <h1 className="titleComics">Liste des comics</h1>
          <div className="filterWrap">
            <Filters setPage={setPage} page={page} totalPages={totalPages} />
            <div className="goToPageWrap">
              <input
                className="finder"
                type="number"
                placeholder="Page..."
                value={goToPage}
                onChange={(e) => setGoToPage(e.target.value)}
                min={1}
                max={totalPages}
                style={{ width: "80px", marginRight: "10px" }}
              />
              <ButtonRed
                title="Go to page"
                size="smallRed"
                onClick={handleGoToPage}
              />
            </div>
            <Finder
              type="comics"
              title={title}
              setTitle={setTitle}
              setPage={setPage}
              placeholder="Rechercher un comic..."
              searchKey="title"
            />
          </div>
          <div className="cardWrap">
            {data.results.map((comic) => {
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

export default Comics;
