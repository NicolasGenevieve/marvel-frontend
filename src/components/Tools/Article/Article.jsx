import "./Article.css";
import { Link } from "react-router-dom";

const Article = ({ link, src, alt, title, description, className }) => {
  return (
    <article className={className}>
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
