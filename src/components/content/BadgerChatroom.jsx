import React, { useEffect, useState, useContext } from "react";
import BadgerMessage from "./BadgerMessage";
import { Container, Row, Col, Pagination, Form, Button } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";


export default function BadgerChatroom(props) {
    const [messages, setMessages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postTitle, setPostTitle] = useState("");
    const [postContent, setPostContent] = useState("");
    const [loginStatus] = useContext(BadgerLoginStatusContext);


    const loadMessages = (page) => {
        fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": "bid_b17011e15e08e0a932b9fbe1084a58619b81e6dfd03fd7e2ac6bdd8ff6a75367"
            }
        })
            .then((res) => res.json())
            .then((json) => {
                setMessages(json.messages);
            });
    };

    const handlePost = (e) => {
        e.preventDefault();

        if (!loginStatus.loggedIn) {
            alert("You must be logged in to post!");
            return;
        }

        if (!postTitle || !postContent) {
            alert("You must provide both a title and content!");
            return;
        }

        fetch(`https://cs571.org/api/f23/hw6/messages?chatroom=${props.name}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_b17011e15e08e0a932b9fbe1084a58619b81e6dfd03fd7e2ac6bdd8ff6a75367",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: postTitle,
                content: postContent,
            }),
        }).then((res) => {
            if (res.status === 200) {
                alert("Successfully posted!");
                loadMessages(currentPage);
                setPostTitle("");
                setPostContent("");
            }
        })
    };

    const handleDeletePost = (postId) => {
        // 
        fetch(`https://cs571.org/api/f23/hw6/messages?id=${postId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_b17011e15e08e0a932b9fbe1084a58619b81e6dfd03fd7e2ac6bdd8ff6a75367",
            },
        }).then((res) => {
            if (res.status === 200) {
                alert("Successfully deleted the post!");
                loadMessages(currentPage);
            }
        })
    };

    useEffect(() => {
        loadMessages(currentPage);
    }, [props.name, currentPage]);




    const buildPagination = () => {
        return (
            <Pagination>
                {Array.from({ length: 4 }).map((_,index) => {
                    const page = index + 1;
                    return (
                        <Pagination.Item
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            active={page === currentPage}
                        >
                            {page}
                        </Pagination.Item>
                    );
                })}
            </Pagination>
        );
    };

    return (
        <Container>
            <h1>{props.name} Chatroom</h1>
            {!loginStatus.loggedIn ? (
                <>
                    <p>You must be logged in to post!</p>
                </>
            ) : (
                <Form onSubmit={handlePost}>
                    <Form.Group style={{ marginBottom: "1rem" }}>
                        <Form.Label htmlFor="postTitle">Post Title</Form.Label>
                        <Form.Control
                            id="postTitle"
                            type="text"
                            value={postTitle}
                            onChange={(e) => setPostTitle(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: "1rem" }}>
                        <Form.Label htmlFor="postContent">Post Content</Form.Label>
                        <Form.Control
                            id="postContent"
                            type="text"
                            value={postContent}
                            onChange={(e) => setPostContent(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Post
                    </Button>
                </Form>)}
            <hr />
            {messages.length > 0 ? (
                <Row>
                    {messages.map((message) => (
                        <Col key={message.id} xs={12} sm={6} md={4} xl={3}>
                            <BadgerMessage
                                id={message.id}
                                title={message.title}
                                poster={message.poster}
                                content={message.content}
                                created={message.created}
                                isOwner={message.poster === loginStatus.username}
                                onDelete={handleDeletePost}
                            />
                        </Col>
                    ))}
                </Row>
            ) : (
                <p>There are no messages on this page yet!</p>
            )}
            {buildPagination()}
        </Container>
    );
}
