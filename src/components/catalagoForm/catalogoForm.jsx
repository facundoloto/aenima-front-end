import React from "react";
import { useState, useEffect } from "react";
import { Button, Form, } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Loader from "../../components/loader/loader";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import "./catalogoForm.css";

export default function CatalogoForm() {

  const { register, handleSubmit } = useForm();
  const [Products, setProducts] = useState([]);
  const [loader, setLoader] = useState("disabled");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const FetchApi = async function FetchApi() {
    if (localStorage.getItem("id") !== null) {
      setLoader("block");
      try {
        const response = await fetch(
          `https://aenima-back.onrender.com/products/${localStorage.getItem(
            "id"
          )}`
        );
        setLoader("disabled");
        const data = await response.json();
        setProducts(data.result);
        setName(data.result.name);
        setDescription(data.result.description);
        setPrice(data.result.price);
      } catch (err) {
        alert(err);
      }
    }
  };

  const onSubmit = async function GetFecth(data) {
    let requestOptions;
    let response;
setLoader("block");
    try {
      let formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("image", data.image[0]);

      if (Products.length === 0) {
        requestOptions = {
          method: `POST`,
          body: formData,
        };
        response = await fetch(
          `https://aenima-back.onrender.com/products/add/`,
          requestOptions
        );
      } else {
        requestOptions = {
          method: `PUT`,
          body: formData,
        };
        response = await fetch(
          `https://aenima-back.onrender.com/products/edit/${localStorage.getItem(
            "id"
          )}/`,
          requestOptions
        );
      }
 setLoader("disabled");
      if (response.status != 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "try again!",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "record save",
          showConfirmButton: false,
          timer: 1500,
        });
        document.getElementById("create-course-form").reset(); //clean form
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    FetchApi();
  }, []);

  return (
    <div>
      <div className={loader}>
        <Loader />
      </div>
      <div className="div-first text-form">
        <div className="center-form">
          <Form onSubmit={handleSubmit(onSubmit)} id="create-course-form">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                placeholder="Normal text"
                required
                defaultValue={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                {...register("name")}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descripcion</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                defaultValue={description}
                onChange={(event) => setDescription(event.target.value)}
                {...register("description")}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                placeholder="Normal text"
                {...register("price")}
                defaultValue={price}
                onChange={(event) => setPrice(event.target.value)}
                aria-required="true"
                required
              />
            </Form.Group>

            <Form.Group controlId="formFileSm" className="mb-3">
              <Form.Label>Cargar Imagen</Form.Label>
              <Form.Control
                type="file"
                size="sm"
                {...register("image")}
                multiple
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  )
};
