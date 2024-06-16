import axios from "axios";

export const fetchArtistInfo = async (appId: string) => {
  try {
    const response = await axios.get(
      `api/lookup?id=${appId}&country=jp&lang=ja_jp`
    );
    const artist = response.data.results[0];
    return {
      artistName: artist.artistName,
      artistId: artist.artistId,
    };
  } catch (error) {
    console.error("Error fetching artist info:", error);
    return null;
  }
};

export const fetchDeveloperApps = async (artistId: string) => {
  try {
    const response = await axios.get(
      `api/lookup?id=${artistId}&entity=software&country=jp&lang=ja_jp`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error fetching developer apps:", error);
    return [];
  }
};
