import React, { useEffect, useState } from "react";
import CityService from "../../services/cityService.js";
import JobPositionsService from "../../services/jobPositionService";
import WorkTypeService from "../../services/workTypeService";
import WorkProgramService from "../../services/workProgramService";
import { Button, Grid } from "@material-ui/core";
import Select from "react-select";
import { FcFilledFilter } from "react-icons/fc";
import JobAdvertisementService from "../../services/jobAdvertisementService.js";

export default function JobFilter({ setJobAdverts }) {
  let jobAdvertisementService = new JobAdvertisementService();
  const [cities, setCities] = useState([]);
  const [jobPositions, setJobPositions] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [workPrograms, setWorkPrograms] = useState([]);

  useEffect(() => {
    let cityService = new CityService();
    cityService.getCities().then((result) => setCities(result.data.data));

    let jobPositionService = new JobPositionsService();
    jobPositionService
      .getJobPositions()
      .then((result) => setJobPositions(result.data.data));

    let workTypeService = new WorkTypeService();
    workTypeService
      .getWorkTypes()
      .then((result) => setWorkTypes(result.data.data));

    let workProgramService = new WorkProgramService();
    workProgramService
      .getWorkPrograms()
      .then((result) => setWorkPrograms(result.data.data));
  }, []);
  const tCities = cities.map(({ id: value, cityName: label }) => ({
    value,
    label,
  }));
  const tJobPositions = jobPositions.map(
    ({ id: value, positionName: label }) => ({
      value,
      label,
    })
  );
  const tWorkPrograms = workPrograms.map(
    ({ id: value, programName: label }) => ({
      value,
      label,
    })
  );
  const tWorkTypes = workTypes.map(({ id: value, workType: label }) => ({
    value,
    label,
  }));

  const [selectedCities, setSelectedCititesOption] = useState(null);
  const [selectedWorkTypes, setSselectedWorkTypesOption] = useState(null);
  const [selectedWorkPrograms, setSelectedWorkProgramsOption] = useState(null);
  const [selectedJobPositions, setSelectedJobPositionsOption] = useState(null);

  const filter = {
    cityId: null,
    jobPositionId: null,
    workProgramId: null,
    workTypeId: null,
  };
  const handleFilter = () => {
    selectedCities !== null && selectedCities.length > 0
      ? (filter.cityId = selectedCities.map((x) => {
          return x.value;
        }))
      : (filter.cityId = null);

    selectedWorkTypes !== null && selectedWorkTypes.length > 0
      ? (filter.workTypeId = selectedWorkTypes.map((x) => {
          return x.value;
        }))
      : (filter.workTypeId = null);

    selectedWorkPrograms !== null && selectedWorkPrograms.length > 0
      ? (filter.workProgramId = selectedWorkPrograms.map((x) => {
          return x.value;
        }))
      : (filter.workProgramId = null);
    selectedJobPositions !== null && selectedJobPositions.length > 0
      ? (filter.jobPositionId = selectedJobPositions.map((x) => {
          return x.value;
        }))
      : (filter.jobPositionId = null);

    jobAdvertisementService
      .getFilteredJobs(filter)
      .then((result) => setJobAdverts(result.data.data));
  };

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Grid item xs={3}>
          <Select
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 10 }),
              valueContainer: (provided, state) => ({
                ...provided,
                minHeight: "30px",
                maxHeight: "60px",
              }),
            }}
            maxMenuHeight="100px"
            placeholder="Şehir"
            closeMenuOnSelect={false}
            defaultValue={null}
            onChange={setSelectedCititesOption}
            isMulti
            options={tCities}
          />
        </Grid>
        <Grid item xs={3}>
          <Select
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 10 }),
              valueContainer: (provided, state) => ({
                ...provided,
                minHeight: "30px",
                maxHeight: "60px",
              }),
            }}
            maxMenuHeight="100px"
            placeholder="İş pozisyonları"
            closeMenuOnSelect={false}
            defaultValue={null}
            onChange={setSelectedJobPositionsOption}
            isMulti
            options={tJobPositions}
          />
        </Grid>
        <Grid item xs={2}>
          <Select
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 10 }),
              valueContainer: (provided, state) => ({
                ...provided,
                minHeight: "30px",
                maxHeight: "60px",
              }),
            }}
            maxMenuHeight="100px"
            placeholder="Çalışma zamanı"
            closeMenuOnSelect={false}
            defaultValue={null}
            onChange={setSelectedWorkProgramsOption}
            isMulti
            options={tWorkPrograms}
          />
        </Grid>
        <Grid item xs={2}>
          <Select
            styles={{
              // Fixes the overlapping problem of the component
              menu: (provided) => ({ ...provided, zIndex: 10 }),
              valueContainer: (provided, state) => ({
                ...provided,
                minHeight: "30px",
                maxHeight: "60px",
              }),
            }}
            maxMenuHeight="100px"
            placeholder="Çalışma biçimi"
            closeMenuOnSelect={false}
            defaultValue={null}
            onChange={setSselectedWorkTypesOption}
            isMulti
            options={tWorkTypes}
          />
        </Grid>
        <Grid item xs={2}>
          <Button color="primary" onClick={handleFilter}>
            <FcFilledFilter color="black" size="2em" />
          </Button>
          {/* <Button color="primary" onClick={clearFilter}>
            <FcClearFilters color="black" size="2em" />
          </Button> */}
        </Grid>
      </Grid>
    </div>
  );
}
