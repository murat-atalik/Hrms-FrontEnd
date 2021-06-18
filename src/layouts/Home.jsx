import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import Image from "material-ui-image";

export default function Home() {
  const history = useHistory();
  const handleOnClick = useCallback(
    () => history.push("/dashboard"),
    [history]
  );
  return (
    <div style={{ marginTop: "4em" }}>
      <Image
        src="https://res.cloudinary.com/eacth/image/upload/v1623616722/home_zcbdse.jpg"
        onClick={handleOnClick}
      />
    </div>
  );
}
