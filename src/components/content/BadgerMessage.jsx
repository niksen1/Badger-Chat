import React from "react"
import { Card, Button } from "react-bootstrap";

function BadgerMessage(props) {

    const dt = new Date(props.created);

    return <Card style={{ margin: "0.5rem", padding: "0.5rem" }}>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br />
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {props.isOwner && (
        <Button
          variant="danger"
          onClick={() => props.onDelete(props.id)}
        >
          Delete
        </Button>
      )}
    </Card>
}

export default BadgerMessage;