import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap"; // Import React Bootstrap components
import { useState } from "react";
// import { useMemoryWallContext } from "../../contexts/MemoryWallContexts";
import "./index.css";
import { postDataWithFileToDatabase } from "../../services/apiFetcher.jsx";

const HighlightForm = ({
  onAddHighlight,
  memoryWallId,
  toggleFormVisibility,
}) => {
  const schema = Yup.object().shape({
    date: Yup.date().required("שדה תאריך הוא שדה חובה"),
    title: Yup.string().required("שדה כותרת הוא שדה חובה"),
    text: Yup.string(),
    image: Yup.mixed(),
  });

  // const { memoryWalls } = useMemoryWallContext();
  // const highlightsNews = memoryWalls[index].highlightsNews;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: "",
      title: "",
      text: "",
      image: "",
    },
  });

  const handleFormSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("text", data.text);
    formData.append("date", new Date(data.date).toLocaleDateString());
    formData.append("img", data.image);
    // console.log(data.image);
    const endpoint = `http://localhost:3000/api/getMemoryWallById/${memoryWallId}/highlightsNews`;
    const newHighlightData = await postDataWithFileToDatabase(
      endpoint,
      formData
    );
    onAddHighlight(newHighlightData);
    reset();
    toggleFormVisibility();
  };

  return (
    <Container className="bg-and-font-color container" style={{ width: "97%" }}>
      <Row className="bg-and-font-color">
        <Col className="bg-and-font-color">
          <Form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="bg-and-font-color"
          >
            <Form.Group controlId="date" className="bg-and-font-color">
              <Form.Label className="bg-and-font-color">:תאריך</Form.Label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    autoFocus
                    type="date"
                    {...field}
                    isInvalid={!!errors.date}
                  />
                )}
              />
              {errors.date && (
                <Form.Control.Feedback type="invalid">
                  {errors.date.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="title" className="bg-and-font-color">
              <Form.Label className="bg-and-font-color">:כותרת</Form.Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    {...field}
                    isInvalid={!!errors.title}
                  />
                )}
              />
              {errors.title && (
                <Form.Control.Feedback type="invalid">
                  {errors.title.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="text" className="bg-and-font-color">
              <Form.Label className="bg-and-font-color">:טקסט</Form.Label>
              <Controller
                name="text"
                control={control}
                render={({ field }) => (
                  <Form.Control
                    as="textarea"
                    {...field}
                    isInvalid={!!errors.text}
                  />
                )}
              />
              {errors.text && (
                <Form.Control.Feedback type="invalid">
                  {errors.text.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group controlId="image" className="bg-and-font-color">
              <Form.Label className="bg-and-font-color">:תמונה</Form.Label>
              <Controller
                name="image"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Form.Control
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => {
                      // Set the file value manually
                      field.onChange(e.target.files[0]);
                    }}
                  />
                )}
              />
              {errors.image && (
                <Form.Control.Feedback type="invalid">
                  {errors.image.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Button
              className="highlight-button"
              variant="primary"
              type="submit"
              style={{
                marginTop: "3%",
                backgroundColor: "#00b3bf",
                border: "none",
              }}
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default HighlightForm;
