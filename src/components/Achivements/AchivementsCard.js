import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BiLinkExternal } from "react-icons/bi";

function AchivementsCard(props) {
  return (
    <Card className="achivement-card-view">
      <Card.Img variant="top" src={props.imgPath} alt="card-img" />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {props.description}
        </Card.Text>
        <Button variant="primary" href={props.vLink} target="_blank">
          <BiLinkExternal /> &nbsp;
          Verify
        </Button>
      </Card.Body>
    </Card>
  );
}
export default AchivementsCard;
