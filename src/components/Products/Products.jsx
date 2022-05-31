import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Products.css';

export default function Products() {
    //it's a state to save the data of form in a json for send to apirest
    const [Products, setProducts] = useState([]);

    const FetchApi = async function FetchApi() {
        if (localStorage.getItem("id") !== null) {
            try {
                const response = await fetch(`https://aenima-back.onrender.com/products/${localStorage.getItem("id")}`);
                const data = await response.json();
                console.log(data);
                setProducts(data.result);
            } catch (err) {
                alert(err);
            }
        };
    };



    useEffect(() => {
        FetchApi();
    }, []);

    return (
        <div>
            <div className="div-first text-form">
                <div className="center-card">
                    <Card key={`${Products.id}`} className="products-card" >
                        <Card.Img variant="top" src={"http://localhost:3080" + `${Products.imagen}`} />
                        <Card.Body className="info ">
                            <ListGroup>
                                <Card.Title className="text-dark">{`${Products.name}`}</Card.Title>
                                <ListGroup.Item className="text-orange">{"$" + `${Products.price}`}</ListGroup.Item>
                                <ListGroup.Item >{`${Products.description}`}</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};
