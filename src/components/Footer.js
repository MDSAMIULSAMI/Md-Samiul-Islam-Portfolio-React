import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { SiCodeforces } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row className="align-items-center">
        <Col md="4" className="footer-copywright">
          <h3>Designed & Built by Md. Samiul Islam</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year}</h3>
          <div className="footer-legal-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <span className="footer-legal-divider">•</span>
            <Link to="/terms-of-service">Terms of Service</Link>
          </div>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/MDSAMIULSAMI"
                style={{ color: "rgba(255,255,255,0.7)" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://codeforces.com/profile/Md_Samiul_Islam"
                style={{ color: "rgba(255,255,255,0.7)" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <SiCodeforces />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/md-samiul-islam-17738a1b9/"
                style={{ color: "rgba(255,255,255,0.7)" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/__samiul__sami__/"
                style={{ color: "rgba(255,255,255,0.7)" }}
                target="_blank" 
                rel="noopener noreferrer"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
