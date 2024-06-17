import type { VercelRequest, VercelResponse } from "@vercel/node";
import { fetchDeveloperApps } from "../src/services/api";
import { OneSignalClient } from "@onesignal/node-onesignal";

// OneSignalの設定
const client = new OneSignalClient({
  appId: import.meta.env.VITE_PUBLIC_ONESIGNAL_APP_ID || "",
  restApiKey: import.meta.env.VITE_PUBLIC_ONESIGNAL_REST_API || "",
});

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const developers = await getDevelopersFromDatabase();

    for (const developer of developers) {
      const developerApps = await fetchDeveloperApps(developer.artistId);
      const newApps = getNewApps(developerApps, developer.existingApps);

      if (newApps.length > 0) {
        await updateDeveloperAppsInDatabase(developer.artistId, developerApps);
        await sendPushNotification(developer.artistName, newApps);
      }
    }

    res.status(200).json({ message: "Developers updated successfully" });
  } catch (error) {
    console.error("Error updating developers:", error);
    res.status(500).json({ error: "Error updating developers" });
  }
};

const getDevelopersFromDatabase = async () => {
  // 実際のデータベースからデベロッパー情報を取得するコードを実装
};

const updateDeveloperAppsInDatabase = async (artistId: string, apps: any) => {
  // 実際のデータベースを更新するコードを実装
};

const getNewApps = (developerApps: any[], existingApps: any[]) => {
  // 新しいアプリを検出するロジックを実装
  const existingAppIds = new Set(existingApps.map((app) => app.trackId));
  return developerApps.filter((app) => !existingAppIds.has(app.trackId));
};

const sendPushNotification = async (developerName: string, newApps: any[]) => {
  const notification = {
    contents: {
      en: `${developerName} has released new apps!`,
    },
    included_segments: ["All"], // すべてのユーザーに送信
    data: {
      newApps,
    },
  };

  await client.createNotification(notification);
};
