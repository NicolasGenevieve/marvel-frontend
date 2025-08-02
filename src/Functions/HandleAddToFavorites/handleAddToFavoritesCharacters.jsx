import axios from "axios";

const handleAddToFavoritesCharacters = async (data, token) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/favoris/characters`,
      {
        characterId: data._id,
        name: data.name,
        thumbnail: {
          path: data.thumbnail.path,
          extension: data.thumbnail.extension,
        },
        description: data.description,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

export default handleAddToFavoritesCharacters;
