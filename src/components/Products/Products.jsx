import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import Loader from "../loader/loader";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Products.css";

export default function Products() {
  const [Products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);

  const FetchApi = async function FetchApi() {
    setLoader(true);
    if (localStorage.getItem("id") !== null) {
      try {
        const response = await fetch(
          `https://aenima-back.onrender.com/products/${localStorage.getItem(
            "id"
          )}`
        );
        const data = await response.json();
        console.log(data);
        setLoader(false);
        setProducts(data.result);
      } catch (err) {
        alert(err);
      }
    }
  };

  useEffect(() => {
    FetchApi();
  }, []);

  return (
    <div>
      {loader == true ? (
        <div className="container-loader">
          <Loader className="loader" />
        </div>
      ) : (
        <div className="div-first text-form">
          <div className="center-card">
            <Card key={`${Products.id}`} className="products-card">
              <Card.Img
                variant="top"
                src={"https://aenima-back.onrender.com" + `${Products.imagen}`}
              />
              <Card.Body className="info ">
                <ListGroup>
                  <Card.Title className="text-dark">{`${Products.name}`}</Card.Title>
                  <ListGroup.Item className="text-orange">
                    {"$" + `${Products.price}`}
                  </ListGroup.Item>
                  <ListGroup.Item>{`${Products.description}`}</ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
