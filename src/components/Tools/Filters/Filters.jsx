import "./Filters.css";
import ButtonRed from "../Buttons/ButtonRed";

const Filters = ({ page, setPage, totalPages }) => {
  return (
    <div className="pagination">
      <ButtonRed
        size="smallRed"
        title="Précedent"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      />
      <span className="page">
        Page {page} sur {totalPages}
      </span>
      <ButtonRed
        size="smallRed"
        title="Suivant"
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      />
    </div>
  );
};

export default Filters;
