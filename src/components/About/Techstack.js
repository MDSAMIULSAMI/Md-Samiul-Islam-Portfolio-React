import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiPython, DiReact, DiHtml5, DiCss3, DiBootstrap } from "react-icons/di";
import {
  SiDjango,
  SiJavascript,
  SiVuedotjs,
  SiCodeforces,
  SiFastapi,
  SiNextdotjs,
  SiNuxtdotjs,
  SiLaravel,
  SiTailwindcss,
  SiStreamlit,
} from "react-icons/si";
import { BsTerminal } from "react-icons/bs";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <DiPython />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiJavascript />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiReact />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiNextdotjs />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVuedotjs />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiNuxtdotjs />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiFastapi />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiDjango />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiLaravel />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiStreamlit />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiHtml5 />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiCss3 />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiTailwindcss />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiBootstrap />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <BsTerminal />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiCodeforces />
      </Col>
    </Row>
  );
}

export default Techstack;