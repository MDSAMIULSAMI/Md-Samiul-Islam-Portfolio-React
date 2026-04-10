import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import myImg from "../../Assets/avatar.svg";
// import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <div md={8} className="home-about-description">
            {/* <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1> */}
            <p className="home-about-body">
            With a Bachelor of Science in <span className="purple">Computer Science and Engineering </span>
            from <span className="green"> Green University of Bangladesh</span>,
            I'm currently working as a <span className="purple">Full Stack Engineer </span>
            at <span className="purple">DataCrata</span>, where I build
            <span className="purple"> RAG and Agentic AI Applications</span>, integrate
            <span className="purple"> LLM Models</span> into existing systems, and evaluate models with
            <span className="purple"> LangSmith</span>.
            <br /><br />
            Previously, I served as a <span className="purple">Junior Software Engineer </span>
            at <span className="purple">Coder Orbit</span>, working with
            <span className="purple"> Vue.js, Nuxt.js, Next.js </span> and <span className="purple">Laravel</span>.
            My passion lies in exploring <span className="purple">web development</span>,
            <span className="purple"> backend engineering</span>, and the potential of
            <span className="purple"> machine learning</span> to solve real-world problems.
            </p>
          </div>
          {/* <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col> */}
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/MDSAMIULSAMI"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/md-samiul-islam-17738a1b9/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/__samiul__sami__/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
