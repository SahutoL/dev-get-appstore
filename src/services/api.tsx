import axios from "axios";

const BASE_URL = "/api/lookup";

export const fetchAppData = async (appId: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        id: appId,
        country: "jp",
        lang: "ja_jp",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching app data:", error);
    throw error;
  }
};

export const fetchDeveloperApps = async (artistId: string) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        id: artistId,
        entity: "software",
        country: "jp",
        lang: "ja_jp",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching developer apps:", error);
    throw error;
  }
};
