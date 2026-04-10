import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
// import laptopImg from "../../Assets/home-main.svg";
import Toolstack from "./Toolstack";

function About() {
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }}>
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }} className="project-heading">
              Know Who <strong className="purple">I'm</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{ paddingTop: "60px", paddingBottom: "50px" }}
            className="about-img"
          >
            <img src="https://i.ibb.co.com/ykL49Mr/about.png" alt="about" className="img-fluid" style={{ maxHeight: "400px" }} />
          </Col>
        </Row>

        <h1 className="project-heading" style={{ paddingBottom: "10px" }}>
          Programming <strong className="purple">Languages & Frameworks</strong>
        </h1>
        <Techstack />

        <h1 className="project-heading" style={{ paddingBottom: "10px" }}>
          <strong className="purple">Tools</strong> I Use
        </h1>
        <Toolstack />

        <Github />
      </Container>
    </Container>
  );
}

export default About;
