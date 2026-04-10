import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
// import Chatroom from "../../Assets/Projects/Chatroom.png";
// import AI_image_gen from "../../Assets/Projects/AI-Image-Generator.png";
// import Movie_Zone from "../../Assets/Projects/Movie-Xone.png";
// import RoBERTa from "../../Assets/Projects/RoBERTa-SAN.png";
// import Blog_App from "../../Assets/Projects/Blog_App.png";
// import NLTK_Sentiment from "../../Assets/Projects/NLTK-Sentiment.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.05em" }}>
          A selection of projects I've built and contributed to.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath="https://i.ibb.co.com/d0LPVskm/ai-assistant-project.png"
              isBlog={false}
              title="AI Assistant/Agent (OpenAI API + Google OAuth)"
              description="Progressive Web Application that integrates dynamic OpenAI model selection based on user prompts and Google Calendar event management through natural language. Uses LangChain to store chat memory."
              ghLink="https://github.com/MDSAMIULSAMI/RoBERTa-SAN-For-Text-Classification/blob/main/roberta-san-adam.ipynb"
              demoLink={false}
            />

          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath="https://i.ibb.co.com/k6GwQcGV/Open-AI-Clip.png"
              isBlog={false}
              title="Image Search by Text Prompt using CLIP"
              description="Uses OpenAI's CLIP model to encode and compare text and image features. Displays the top-k most similar images based on cosine similarity between the prompt and image features."
              ghLink="https://github.com/MDSAMIULSAMI/Image-Search-by-Text-Prompt-using-CLIP"
              demoLink={false}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath="https://i.ibb.co.com/KqMHGsF/Ro-BERTa-SAN.png"
              isBlog={false}
              title="RoBERTa-SAN For Text Classification (A Novel Transformer Hybrid Model Introduced By My Team)"
              description="Implemented in Kaggle Notebook and Trained on Bangla Not Depressive, Depressive & Suicidal Classed Dataset (Collected Manually)."
              ghLink="https://github.com/MDSAMIULSAMI/RoBERTa-SAN-For-Text-Classification/blob/main/roberta-san-adam.ipynb"
              demoLink={false} 
            />
                
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath="https://i.ibb.co.com/CmzbDWp/NLTK-Sentiment.png"
              isBlog={false}
              title="Sentiment Detector Using NLTK Library and Django"
              description="Simple Interface in Browser with Input Form Where User Will Insert Text. NLTK Library Will Calculate Text's Sentiment and Give a Score (Positive, Negative or Neutral)."
              ghLink="https://github.com/MDSAMIULSAMI/Sentiment_Predictor_NLTK"
              demoLink={false}   
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath="https://i.ibb.co.com/YNCTBVm/Movie-Xone.png"
              isBlog={false}
              title='Movie Watching Web Application MovieXone Using RESTApi and React'
              description="This is a Web Application. Online Movie Stream Site with React as Front End. For Back End, used Django and RESTApi"
              ghLink="https://github.com/MDSAMIULSAMI/MovieZone-Project"
              demoLink={false}             
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath="https://i.ibb.co.com/rmL7Myw/Chatroom.png"
              isBlog={false}
              title="Simple Chat Room Web Application (Using HTML, CSS, Socket.IO & JavaScript)"
              description='Group Chat Interface. Used the concept of Socket.IO'
              ghLink="https://github.com/MDSAMIULSAMI/Simple-Real-Time-Chat-Room"
              demoLink={false}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath="https://i.ibb.co.com/5xqf7QF/AI-Image-Generator.png"
              isBlog={false}
              title="AI Image Generator with Stable Diffusion"
              description="To generate AI image, used Stable Diffusion model. 
              Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images given any text input."
              ghLink="https://github.com/MDSAMIULSAMI/AI-Image-Generator.git"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath="https://i.ibb.co.com/tJk2crR/Blog-App.png"
              isBlog={false}
              title="Sam Blog App"
              description="This project is a robust, feature-packed blog platform built with Django, designed for both bloggers and readers. 
              It offers an intuitive, user-friendly interface that makes creating, managing, and engaging with blog posts seamless. 
              Whether you're a seasoned Django developer or a first-time user, this documentation will guide you through the setup, functionality, and features of the app. 
              Dive in to discover how Sam Blog App can enhance your blogging experience!"
              ghLink="https://github.com/MDSAMIULSAMI/Posting_App.git"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
