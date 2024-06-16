import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";

const BASE_URL = "https://itunes.apple.com/lookup";

export default async (req: VercelRequest, res: VercelResponse) => {
  const { id, country, lang, entity } = req.query;

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        id,
        country,
        lang,
        entity,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};
