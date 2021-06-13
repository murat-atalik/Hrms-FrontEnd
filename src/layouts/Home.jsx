import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Button, Image } from "semantic-ui-react";

export default function Home() {
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push("/job"), [history]);
  return (
    <div style={{ marginTop: "3.5em" }}>
      <Image
        src="https://res.cloudinary.com/eacth/image/upload/v1623616722/home_zcbdse.jpg"
        onClick={handleOnClick}
        fluid
      />
    </div>
  );
}
