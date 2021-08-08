import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();
  const handleOnClick = useCallback(
    () => history.push("/jobadvertlist"),
    [history]
  );
  return (
    <div>
      <img
        src="https://res.cloudinary.com/eacth/image/upload/v1628371007/111875-OO8L3H-336-ai_fqlfbh.png"
        alt="home"
        onClick={handleOnClick}
        style={{ width: "100%", height: "auto", marginTop: "4.5em" }}
      />
    </div>
  );
}
