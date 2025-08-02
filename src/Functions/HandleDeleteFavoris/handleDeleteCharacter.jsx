import axios from "axios";

const handleDeleteCharacter = async (id, setCharacters, token) => {
  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/favoris/characters/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setCharacters((prev) => prev.filter((char) => char._id !== id));
  } catch (error) {
    console.log("Erreur suppression personnage :", error);
  }
};

export default handleDeleteCharacter;
