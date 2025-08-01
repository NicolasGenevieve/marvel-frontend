import "./Article.css";
import { Link } from "react-router-dom";

const Article = ({ key, link, src, alt, title, description }) => {
  return (
    <article className="card" key={key}>
      <Link className="cardLink" to={link}>
        <div className="cardImg">
          <img src={src} alt={alt} />
        </div>
        <div className="cardNameWrap">
          <h2 className="cardName">{title}</h2>
          <p className="cardDescription">{description}</p>
        </div>
      </Link>
    </article>
  );
};

export default Article;
