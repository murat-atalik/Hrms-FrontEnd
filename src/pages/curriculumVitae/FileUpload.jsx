import React from "react";
import CurriculumVitaeService from "../../services/curriculumVitaeService";

export default function FileUpload() {
  const service = new CurriculumVitaeService();
  const onSubmit = (data) => {
    console.log(data.target.files[0], "$$$$");
    service.addImage(data.target.files[0]).then();
  };

  return (
    <div>
      <input type="file" name="file" onChange={(file) => onSubmit(file)} />
      <button type="button">Submit</button>
    </div>
  );
}
