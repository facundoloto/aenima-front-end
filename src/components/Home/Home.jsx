import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Card, ListGroup, Nav, NavDropdown, Navbar, Container, Button, ButtonGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import Loader from './../Loader/Loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Home.css";


export function Home() {

  const [Products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const Navigate = useNavigate();

  localStorage.clear();

  const FetchApi = async function FetchApi() {
    try {
      setLoader(true);
      const response = await fetch(`https://aenima-back.onrender.com/products/`);
      const data = await response.json();
      console.log(data);
      setProducts(data.result);
      setLoader(false);
    } catch (err) {
      alert(err);
    }
  };

  const lowPrice = async function lowPrice() {
    try {
      setLoader(true);
      const response = await fetch(`https://aenima-back.onrender.com/products/`);
      const data = await response.json();
      console.log(data);
      setProducts(data.result.sort((a, b) => a.price - b.price));
      setLoader(false);
    } catch (err) {
      alert(err);
    }
  };

  const highPrice = async function highPrice() {
    try {
      setLoader(true);
      const response = await fetch(`https://aenima-back.onrender.com/products/`);
      const data = await response.json();
      console.log(data);
      setProducts(data.result.sort((a, b) => b.price - a.price));
      setLoader(false);
    } catch (err) {
      alert(err);
    }
  };

  const name = async function name() {
    try {
      setLoader(true);
      const response = await fetch(`https://aenima-back.onrender.com/products/`);
      const data = await response.json();
      console.log(data);
      setProducts(data.result.sort((a, b) => a.name.localeCompare(b.name)));
      setLoader(false);
    } catch (err) {
      alert(err);
    }
  };

  const deleteProducts = async function (id) {
    try {
      const requestOptions = {
        method: `DELETE`,
      };
      const response = await fetch(`https://aenima-back.onrender.com/products/${id}`, requestOptions);
      const data = await response.json();
      
      if (data.status != 200) {
        Swal.fire({
          icon: "success",
          title: "producto eliminado",
          showConfirmButton: false,
          timer: 1500,
        });
        FetchApi();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "try again!",
        });
    } 
  }
    catch (err) {
      alert(err);
    }
  }


  const EditProducts = async function (id) {
    localStorage.setItem("id", id);
    Navigate("/editar");
  };

  const showProduct = async function (id) {
    localStorage.setItem("id", id);
    Navigate("/productos");
  };

  useEffect(() => {
    FetchApi();
  }, []);


  return (
    <div>
      <Navbar variant="dark" className="bg-violet position-fixed w-100" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">AENIMA</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-dark-example" />
          <Navbar.Collapse id="navbar-dark-example">
            <Nav>
              <NavDropdown
                id="nav-dropdown-dark-example"
                title="Filtros"
                menuVariant="bg-violet"
              >
                <ButtonGroup vertical className="">
                  <Button
                    className="bg-filter"
                    name="lowPrice"
                    id="lowPrice"
                    value="lowPrice"
                    onClick={() => lowPrice()}
                  >Precio Menor</Button>
                  <Button className="bg-filter" onClick={() => highPrice()}>Precio Mayor</Button>
                  <Button className="bg-filter" onClick={() => name()}>Nombre</Button>
                </ButtonGroup>
                <NavDropdown.Divider />
              </NavDropdown>
              <Nav.Item><Link to={"/agregar/"}><Button className="bg-add">agregar</Button></Link></Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <div className="home">
      <div>
      
      </div>
        <div className="container-card text-dark">
          {
            loader == true ? (
              <div className="container-loader">
              <Loader className="loader"/>
              </div>
            ) : (
              <div>
                {
                  Products.map((data) => {
                    console.log(data);
                    return (
                      <Card key={`${data.id}`} className="products " >
                        <ButtonGroup className="groupButton" size="sm">
                          <Button className="bg-delete" onClick={() => { deleteProducts(data.id) }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                          </svg></Button>
                          <Button className="bg-edit" onClick={() => { EditProducts(data.id) }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>
                          </Button>
                        </ButtonGroup>
                        <Card.Img variant="top" src={"https://aenima-back.onrender.com" + `${data.imagen}`} />
                        <Card.Body className="info ">
                          <ListGroup>
                            <Card.Title className="text-dark">{`${data.name}`}</Card.Title>
                            <ListGroup.Item className="text-orange">{"$" + `${data.price}`}</ListGroup.Item>
                            <ListGroup.Item >{`${data.description}`}</ListGroup.Item>
                            <ListGroup.Item ><Button variant="primary" onClick={() => { showProduct(data.id) }}>Detalles</Button></ListGroup.Item>
                          </ListGroup>
                        </Card.Body>
                      </Card>
                    )
                  })
                }
              </div>
            )
          }
        </div>
      </div>
    </div>
  );

};
