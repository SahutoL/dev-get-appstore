import React from "react";
import AppItem from "./AppItem";

interface DeveloperProps {
  apps: any[];
}

const Developer: React.FC<DeveloperProps> = ({ apps }) => {
  return (
    <div className="Developer">
      {apps.map((app) => (
        <AppItem key={app.trackId} app={app} />
      ))}
    </div>
  );
};

export default Developer;
