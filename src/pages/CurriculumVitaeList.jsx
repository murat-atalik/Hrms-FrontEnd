import React, { useState, useEffect } from "react";
import { Icon, Image, Menu, Table } from "semantic-ui-react";
import CurriculumVitaeService from "../services/curriculumVitaeService";

export default function CurriculumVitaeList() {
  const [curriculumVitaes, setCurriculumVitaes] = useState([]);
  useEffect(() => {
    let cvService = new CurriculumVitaeService();
    cvService.getCv().then((result) => setCurriculumVitaes(result.data.data));
  }, []);
  return (
    <div>
      <Table selectable striped color="blue">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Ad Soyad</Table.HeaderCell>
            <Table.HeaderCell>cover letter</Table.HeaderCell>

            <Table.HeaderCell>Yabancı Diller</Table.HeaderCell>
            <Table.HeaderCell>Yetenekler</Table.HeaderCell>

            <Table.HeaderCell>experience</Table.HeaderCell>
            <Table.HeaderCell>educations</Table.HeaderCell>
            <Table.HeaderCell>Github</Table.HeaderCell>
            <Table.HeaderCell>LinkedIn</Table.HeaderCell>
            <Table.HeaderCell>İncele</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {curriculumVitaes.map((cv) => {
            return (
              <Table.Row key={cv.id}>
                <Table.Cell>
                  <Image src={cv?.imageUrl} size="tiny" avatar />
                  {cv.candidate?.firstName + "  " + cv.candidate?.lastName}
                </Table.Cell>
                <Table.Cell>{cv.coverLetter}</Table.Cell>
                <Table.Cell>
                  {cv.languages.map((language) => (
                    <p key={language.id}>{language.language}</p>
                  ))}
                </Table.Cell>
                <Table.Cell>
                  {cv.abilities.map((tech) => (
                    <p key={tech.id}>{tech.abilityName}</p>
                  ))}
                </Table.Cell>
                <Table.Cell>
                  {cv.experiences.map((experience) => (
                    <p key={experience.id}>{experience.businessName}</p>
                  ))}
                </Table.Cell>
                <Table.Cell>
                  {cv.educations.map((eductaion) => (
                    <p key={eductaion.id}>{eductaion.schoolName}</p>
                  ))}
                </Table.Cell>{" "}
                <Table.Cell>
                  {" "}
                  <a
                    href={cv.github}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    <Icon name="github" color="black" size="big" />
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a
                    href={cv.linkedin}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    <Icon name="linkedin" color="blue" size="big" />
                  </a>
                </Table.Cell>
                <Table.Cell>
                  <a
                    href={cv.github}
                    target={"_blank"}
                    rel="noopener noreferrer"
                  >
                    <Icon name="search" color="grey" size="big" />
                  </a>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="10">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}
