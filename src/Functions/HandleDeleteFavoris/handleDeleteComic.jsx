import axios from "axios";

const handleDeleteComic = async (id, setComics, token) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/favoris/comics/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setComics((prev) => prev.filter((comic) => comic._id !== id));
  } catch (error) {
    console.log("Erreur suppression comic :", error);
  }
};

export default handleDeleteComic;
