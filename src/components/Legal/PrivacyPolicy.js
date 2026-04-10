import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MdSecurity, MdEmail, MdUpdate } from "react-icons/md";
import { BsShieldCheck, BsPersonCheck, BsGlobe2 } from "react-icons/bs";

function PrivacyPolicy() {
  return (
    <Container fluid className="legal-section">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="legal-header">
              <div className="legal-icon-wrapper">
                <MdSecurity className="legal-header-icon" />
              </div>
              <h1 className="legal-title">
                Privacy <span className="purple">Policy</span>
              </h1>
              <p className="legal-last-updated">
                <MdUpdate /> Last updated: April 10, 2026
              </p>
            </div>

            <div className="legal-content">
              <div className="legal-card">
                <div className="legal-card-icon">
                  <BsPersonCheck />
                </div>
                <h2>Introduction</h2>
                <p>
                  Welcome to the portfolio website of <strong>Md. Samiul Islam</strong>. 
                  Your privacy is important to me. This Privacy Policy explains how I 
                  collect, use, and protect your information when you visit my website.
                </p>
              </div>

              <div className="legal-card">
                <div className="legal-card-icon">
                  <BsShieldCheck />
                </div>
                <h2>Information I Collect</h2>
                <p>
                  This is a personal portfolio website. I do <strong>not</strong> collect 
                  personal data through forms, accounts, or tracking pixels. However, the 
                  following may be passively collected:
                </p>
                <ul className="legal-list">
                  <li>
                    <span className="legal-list-marker">▸</span>
                    <strong>Usage Data:</strong> Basic analytics such as page views, browser 
                    type, and device information may be collected through hosting providers.
                  </li>
                  <li>
                    <span className="legal-list-marker">▸</span>
                    <strong>Log Files:</strong> Standard server log files that include IP 
                    addresses, timestamps, and referring URLs.
                  </li>
                </ul>
              </div>

              <div className="legal-card">
                <div className="legal-card-icon">
                  <BsGlobe2 />
                </div>
                <h2>Cookies &amp; Third-Party Services</h2>
                <p>
                  This website may use minimal cookies for functionality purposes. 
                  Third-party services embedded on this site (such as GitHub contribution 
                  calendars) may set their own cookies. I recommend reviewing the privacy 
                  policies of these third-party services.
                </p>
              </div>

              <div className="legal-card">
                <div className="legal-card-icon">
                  <BsShieldCheck />
                </div>
                <h2>How I Use Information</h2>
                <p>Any information passively collected is used solely to:</p>
                <ul className="legal-list">
                  <li>
                    <span className="legal-list-marker">▸</span>
                    Understand website traffic and improve the user experience.
                  </li>
                  <li>
                    <span className="legal-list-marker">▸</span>
                    Maintain the security and performance of the website.
                  </li>
                </ul>
              </div>

              <div className="legal-card">
                <div className="legal-card-icon">
                  <MdSecurity />
                </div>
                <h2>Data Security</h2>
                <p>
                  I take reasonable precautions to protect your information. This website 
                  is hosted on secure platforms with HTTPS encryption. However, no method 
                  of transmission over the Internet is 100% secure.
                </p>
              </div>

              <div className="legal-card">
                <div className="legal-card-icon">
                  <MdEmail />
                </div>
                <h2>Contact</h2>
                <p>
                  If you have any questions about this Privacy Policy, feel free to reach 
                  out via my social media profiles linked in the footer of this website.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default PrivacyPolicy;
