import { useEffect } from "react";
import OneSignal from "react-onesignal";
import Home from "./components/Home";

const App = () => {
  useEffect(() => {
    OneSignal.init({
      appId: import.meta.env.VITE_PUBLIC_ONESIGNAL_APP_ID || "",
    });

    OneSignal.showSlidedownPrompt().catch((err) => {
      console.error("Error displaying the slidedown prompt:", err);
    });
  }, []);

  return (
    <div className="App">
      <Home />
    </div>
  );
};

export default App;
