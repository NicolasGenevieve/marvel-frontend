import axios from "axios";

const handleAddToFavoritesComics = async (data, token) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/favoris/comics",
      {
        comicId: data._id,
        title: data.title,
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

export default handleAddToFavoritesComics;
