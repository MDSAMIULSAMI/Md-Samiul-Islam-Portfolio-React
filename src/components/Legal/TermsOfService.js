import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { MdGavel, MdUpdate, MdLink } from "react-icons/md";
import { BsFileEarmarkText, BsExclamationTriangle, BsPerson } from "react-icons/bs";
import { AiOutlineCopyright } from "react-icons/ai";

function TermsOfService() {
  return (
    <Container fluid className="legal-section">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="legal-header">
              <div className="legal-icon-wrapper">
                <MdGavel className="legal-header-icon" />
              </div>
              <h1 className="legal-title">
                Terms of <span className="purple">Service</span>
              </h1>
              <p className="legal-last-updated">
                <MdUpdate /> Last updated: April 10, 2026
              </p>
            </div>

            <div className="legal-content">
              <div className="legal-card">
                <div className="legal-card-icon">
                  <BsFileEarmarkText />
                </div>
                <h2>Agreement to Terms</h2>
                <p>
                  By accessing and using this portfolio website of{" "}
                  <strong>Md. Samiul Islam</strong>, you agree to be bound by these Terms 
                  of Service. If you do not agree with any part of these terms, please do 
                  not use this website.
                </p>
              </div>

              <div className="legal-card">
                <div className="legal-card-icon">
                  <BsPerson />
                </div>
                <h2>Use of This Website</h2>
                <p>
                  This website is provided for informational and portfolio showcase 
                  purposes. You may browse the website freely, subject to the following 
                  conditions:
                </p>
                <ul className="legal-list">
                  <li>
                    <span className="legal-list-marker">▸</span>
                    You shall not use this website for any unlawful purpose or in 
                    violation of any applicable laws.
                  </li>
                  <li>
                    <span className="legal-list-marker">▸</span>
                    You shall not attempt to interfere with the proper functioning of this 
                    website.
                  </li>
                  <li>
                    <span className="legal-list-marker">▸</span>
                    You shall not scrape, copy, or redistribute the content without 
                    explicit permission.
                  </li>
                </ul>
              </div>

              <div className="legal-card">
                <div className="legal-card-icon">
                  <AiOutlineCopyright />
                </div>
                <h2>Intellectual Property</h2>
                <p>
                  All content on this website — including but not limited to text, images, 
                  graphics, code samples, project descriptions, and design elements — is 
                  the intellectual property of <strong>Md. Samiul Islam</strong> unless 
                  otherwise noted.
                </p>
                <p>
                  Unauthorized reproduction, distribution, or modification of any content 
                  from this website is strictly prohibited without prior written consent.
                </p>
              </div>

              <div className="legal-card">
                <div className="legal-card-icon">
                  <MdLink />
                </div>
                <h2>Third-Party Links</h2>
                <p>
                  This website may contain links to external websites and services (e.g., 
                  GitHub, LinkedIn, Codeforces). I am not responsible for the content, 
                  privacy practices, or terms of service of any third-party websites. 
                  Visiting these links is at your own discretion and risk.
                </p>
              </div>

              <div className="legal-card">
                <div className="legal-card-icon">
                  <BsExclamationTriangle />
                </div>
                <h2>Disclaimer of Warranties</h2>
                <p>
                  This website is provided on an <strong>"as is"</strong> and{" "}
                  <strong>"as available"</strong> basis without warranties of any kind, 
                  either express or implied. I do not guarantee the accuracy, completeness, 
                  or reliability of any content on this website.
                </p>
              </div>

              <div className="legal-card">
                <div className="legal-card-icon">
                  <BsExclamationTriangle />
                </div>
                <h2>Limitation of Liability</h2>
                <p>
                  In no event shall Md. Samiul Islam be liable for any direct, indirect, 
                  incidental, or consequential damages arising from your use of or 
                  inability to use this website.
                </p>
              </div>

              <div className="legal-card">
                <div className="legal-card-icon">
                  <MdGavel />
                </div>
                <h2>Changes to Terms</h2>
                <p>
                  I reserve the right to update or modify these Terms of Service at any 
                  time. Changes will be reflected by the "Last updated" date at the top 
                  of this page. Continued use of the website constitutes acceptance of any 
                  changes.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default TermsOfService;
