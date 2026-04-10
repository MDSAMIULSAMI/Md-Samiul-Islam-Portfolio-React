import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import PfE from "../../Assets/Certificates/Programming_Everybody.jpeg"
// import PDj from "../../Assets/Certificates/Python_Django.png"
// import AI from "../../Assets/Certificates/AI_For_Everone.jpeg"
// import AINano from "../../Assets/Certificates/AI_Nano_Course.jpeg"
import AchivementsCard from "./AchivementsCard";
import Particle from "../Particle";

function Achivement() {
  return (
    <Container fluid className="achivement-section">
      <Particle />
      <Container>
        <h1 className="achivement-heading">
          My <strong className="purple">Achievements </strong>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05em", marginBottom: "0" }}>
          Recognition through research publications and specialized courses.
        </p>

        {/* Research Papers */}
        <h2 className="project-heading" style={{ fontSize: "1.5em", paddingTop: "30px", paddingBottom: "5px" }}>
          Published <strong className="purple">Research</strong>
        </h2>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>

          <Col md={4} className="achivement-card">
            <AchivementsCard
              imgPath="https://i.ibb.co.com/gZFwtSG4/research-paper-2.png"
              title="Research Paper — Research in Business & Social Science"
              description="Published: 'Transformer-Based Sentiment Analysis for Classification of Non-Depressive and Suicidal Thought from Bangla Text'"
              vLink="https://www.researchgate.net/publication/394588211_Transformer-Based_Sentiment_Analysis_for_classification_of_non-depressive_and_suicidal_thought_from_Bangla_Text"
              />
          </Col>

          <Col md={4} className="achivement-card">
            <AchivementsCard
              imgPath="https://i.ibb.co.com/99FgwbFx/research-paper-1.png"
              title="Research Paper — Journal of Business & IT"
              description="Published: 'Depressive and Suicidal Text-Based Sentiment Analysis in Bangla Using Deep Learning Models'"
              vLink="https://www.researchgate.net/publication/387043086_Depressive_and_Suicidal_Text-Based_Sentiment_Analysis_in_Bangla_Using_Deep_Learning_Models"
            />
          </Col>
        </Row>

        {/* Certifications */}
        <h2 className="project-heading" style={{ fontSize: "1.5em", paddingTop: "20px", paddingBottom: "5px" }}>
          <strong className="purple">Certifications</strong>
        </h2>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={3} className="achivement-card">
            <AchivementsCard
              imgPath="https://i.ibb.co.com/5MDD0kL/Programming-Everybody.jpg"
              title="Programming for Everybody (Getting Started with Python)"
              description="Completed October 8, 2020 — 18 hours · Coursera"
              vLink="https://coursera.org/share/07f76ab8872b96ecba8ff17cee273ef4"
            />
                
          </Col>

          <Col md={3} className="achivement-card">
            <AchivementsCard
              imgPath="https://i.ibb.co.com/CzSyFYj/Python-Django.png"
              title="Data Science Expert with Python Django"
              description="Completed September 8, 2024 — 2 hours · Simplilearn"
              vLink="https://simpli-web.app.link/e/42zpWLxPuNb"          
            />
          </Col>

          <Col md={3} className="achivement-card">
            <AchivementsCard
              imgPath="https://i.ibb.co.com/7yZcqJz/AI-For-Everone.jpg"
              title="AI For Everyone"
              description="Completed June 29, 2020 — 6 hours · Coursera"
              vLink="https://coursera.org/share/6ecabbbf6c791eac234c47930bf3ed84"
            />
          </Col>

          <Col md={3} className="achivement-card">
            <AchivementsCard
              imgPath="https://i.ibb.co.com/y0b97RV/AI-Nano-Course.jpg"
              title="Business Implications of AI: A Nano-course"
              description="Completed July 1, 2020 — 1 hour · Coursera"
              vLink="https://coursera.org/share/a9f5b01fc014113f4ba094aac1c9230a"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Achivement;
