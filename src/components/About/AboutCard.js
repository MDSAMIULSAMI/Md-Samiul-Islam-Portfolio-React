import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Greetings Everyone, I'm <span className="purple">Md. Samiul Islam </span>
            from <span className="purple"> Dhaka, Bangladesh.</span>
            <br />
            I graduated with a B.Sc. in CSE from <span className="green">Green University of Bangladesh</span> (CGPA: 3.30).
            <br /><br />
            Currently, I'm working as a <span className="purple">Full Stack Engineer </span>
            at <span className="purple">DataCrata</span>, building RAG and Agentic AI applications with
            <span className="purple"> FastAPI, React, and LLM integrations</span>.
            <br />
            Previously, I worked as a <span className="purple">Junior Software Engineer </span>
            at <span className="purple">Coder Orbit</span> (Vue.js, Nuxt.js, Next.js, Laravel) and as a
            <span className="purple"> Frontend Developer Intern </span>
            at <span className="purple">Unicorn Software Solutions Ltd.</span>
            <br />
            <br />
            Apart from coding, some of my field of interest are:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Machine Learning & Deep Learning
            </li>
            <li className="about-activity">
              <ImPointRight /> Natural Language Processing (NLP) Research
            </li>
            <li className="about-activity">
              <ImPointRight /> AI Application Development & Workflows
            </li>
            <li className="about-activity">
              <ImPointRight /> Generative AI (Stable Diffusion Models)
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
          "Artificial Intelligence, deep learning, machine learning — whatever you're doing if you don't understand it — learn it. Because otherwise you're going to be a dinosaur within 3 years."{" "}
          </p>
          <footer className="blockquote-footer">Mark Cuban</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
