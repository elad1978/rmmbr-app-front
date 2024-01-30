import "./index.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputGroup, Form, Container, Button, Row, Col } from "react-bootstrap";

const MemoryPageForm = () => {
  const [childrenFields, setChildrenFields] = useState([]);
  const [partnersFields, setPartnersFields] = useState([]);
  const [parentsFields, setParentsFields] = useState([]);
  const [picturesFields, setPicturesFields] = useState([]);

  const addChildrenField = () => {
    const newField = { name: "", value: "" };
    setChildrenFields([...childrenFields, newField]);
  };
  const addPartnersFields = () => {
    const newField = { name: "", value: "" };
    setPartnersFields([...partnersFields, newField]);
  };

  const addParentsFields = () => {
    const newField = { name: "", value: "" };
    setParentsFields([...parentsFields, newField]);
  };
  const addPicturesFields = () => {
    const newField = { name: "", value: "" };
    setPicturesFields([...picturesFields, newField]);
  };

  const schema = yup.object().shape({
    fullName: yup.string().required("חובה לציין שם"),
    imagePath: yup.string(),
    description: yup.string(),
    birthDate: yup.mixed(),
    // birthDate: yup
    //   .mixed()
    //   .test("is-valid-date", "שדה תאריך לא תקין", function (value) {
    //     if (!value || value instanceof Date) return true;
    //     return false;
    //   }),

    deathDate: yup.mixed(),
    // deathDate: yup
    //   .mixed()
    //   .test("is-valid-date", "שדה תאריך לא תקין", function (value) {
    //     if (!value || value instanceof Date) return true;
    //     return false;
    //   }),
    candlesAmount: yup
      .number("מספר בלבד")
      .transform((value) => (isNaN(value) ? undefined : value))
      .positive("מספר חיובי בלבד")
      .integer("מספר שלם בלבד"),
    flowersAmount: yup
      .number("מספר בלבד")
      .transform((value) => (isNaN(value) ? undefined : value))
      .positive("מספר חיובי בלבד")
      .integer("מספר שלם בלבד"),
    about: yup.string(),
    parents: yup.array().of(
      yup.object().shape({
        parentName: yup.string().required("שם חובה"),
      })
    ),
    children: yup.array().of(
      yup.object().shape({
        childName: yup.string().required("שם חובה"),
      })
    ),
    partnerName: yup.array().of(
      yup.object().shape({
        partnerName: yup.string().required("שם חובה"),
      })
    ),
    gallery: yup.array().of(
      yup.object().shape({
        imagePath: yup.string(),
      })
    ),
    stories: yup.array().of(
      yup.object().shape({
        text: yup.string().required("שדה חובה"),
        title: yup.string().required("כותרת חובה"),
        date: yup.date(),
        imagePath: yup.string(),
      })
    ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="blue-form-part blue-container">
            <Row className="blue-form-part">
              <Col className="blue-form-part">
                {errors.fullName && (
                  <Form.Text className="text-danger blue-form-part">
                    {errors.fullName.message}
                  </Form.Text>
                )}
                <InputGroup className="mb-3 blue-form-part" size="lg">
                  <Form.Control
                    type="text"
                    {...register("fullName")}
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                  <InputGroup.Text id="inputGroup-sizing-lg ">
                    :שם מלא
                  </InputGroup.Text>
                </InputGroup>
                {errors.description && (
                  <Form.Text className="text-danger blue-form-part">
                    {errors.description.message}
                  </Form.Text>
                )}
                <InputGroup className="mb-3 blue-form-part" size="lg">
                  <Form.Control
                    type="text"
                    {...register("description")}
                    aria-label="Large"
                    aria-describedby="inputGroup-sizing-sm"
                  />
                  <InputGroup.Text id="inputGroup-sizing-lg">
                    :תאור קצר
                  </InputGroup.Text>
                </InputGroup>
                <Row className="blue-form-part">
                  <Col className="blue-form-part">
                    {errors.deathDate && (
                      <Form.Text className="text-danger blue-form-part">
                        {errors.deathDate.message}
                      </Form.Text>
                    )}
                    <InputGroup className="mb-3 blue-form-part" size="lg">
                      <Form.Control {...register("deathDate")} type="date" />
                      <InputGroup.Text>:תאריך פטירה</InputGroup.Text>
                    </InputGroup>
                  </Col>

                  <Col className="blue-form-part">
                    {errors.birthDate && (
                      <Form.Text className="text-danger blue-form-part">
                        {errors.birthDate.message}
                      </Form.Text>
                    )}
                    <InputGroup className="blue-form-part" size="lg">
                      <Form.Control {...register("birthDate")} type="date" />
                      <InputGroup.Text>:תאריך לידה</InputGroup.Text>
                    </InputGroup>
                  </Col>
                </Row>
              </Col>
              <Col className="blue-form-part" xs={12} md={12} lg={3} xl={3}>
                <label htmlFor="imagePath" className="custom-file-upload">
                  <img
                    src="icons8-add-camera-48.png"
                    style={{ width: "100%", height: "100%" }}
                  />
                  <input
                    type="file"
                    id="image"
                    {...register("imagePath")}
                    className="form-control"
                  />
                </label>
                <p className="text-danger">{errors.imagePath?.message}</p>
              </Col>
            </Row>
          </div>
          <div className="about gray-background">
            <InputGroup className="mb-3" size="lg">
              <Form.Control
                as="textarea"
                rows={3}
                {...register("about")}
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
              <InputGroup.Text
                id="inputGroup-sizing-lg"
                // style={{ backgroundColor: "#f3f5f8" }}
              >
                :אודות
              </InputGroup.Text>
              {errors.about && (
                <Form.Text className="text-danger blue-form-part">
                  {errors.about.message}
                </Form.Text>
              )}
            </InputGroup>
          </div>
          <div className="family">
            <h3>משפחה</h3>
            <Row>
              <Col>
                <Form.Group controlId="mainId">
                  <Form.Label>:ילדים</Form.Label>
                </Form.Group>
                {childrenFields.map((field, index) => (
                  <Form.Group controlId={`childrenFields${index}`} key={index}>
                    <Form.Label>שם</Form.Label>
                    <Form.Control
                      {...register(`childrenFields[${index}].name`)}
                    />
                    <Form.Label>:תמונה</Form.Label>
                    <Form.Control
                      {...register(`childrenFields[${index}].value`)}
                      type="file"
                    />
                  </Form.Group>
                ))}

                <Button
                  variant="primary"
                  onClick={addChildrenField}
                  style={{ backgroundColor: "#022855" }}
                  className="mt-4"
                >
                  הוסף
                </Button>
              </Col>
              <Col>
                <Form.Group controlId="mainField">
                  <Form.Label>:זוגיות</Form.Label>
                </Form.Group>

                {partnersFields.map((field, index) => (
                  <Form.Group controlId={`partnersFields${index}`} key={index}>
                    <Form.Label>שם</Form.Label>
                    <Form.Control
                      {...register(`partnersFields[${index}].name`)}
                    />
                    <Form.Label>:תמונה</Form.Label>
                    <Form.Control
                      {...register(`partnersFields[${index}].value`)}
                      type="file"
                    />
                  </Form.Group>
                ))}

                <Button
                  variant="primary"
                  onClick={addPartnersFields}
                  style={{ backgroundColor: "#022855" }}
                  className="mt-4"
                >
                  הוסף
                </Button>
              </Col>
              <Col>
                {" "}
                <Form.Group controlId="mainField">
                  <Form.Label>:הורים</Form.Label>
                </Form.Group>
                {parentsFields.map((field, index) => (
                  <Form.Group controlId={`parentsFields${index}`} key={index}>
                    <Form.Label>שם</Form.Label>
                    <Form.Control
                      {...register(`parentsFields[${index}].name`)}
                    />
                    <Form.Label>:תמונה</Form.Label>
                    <Form.Control
                      {...register(`parentsFields[${index}].value`)}
                      type="file"
                    />
                  </Form.Group>
                ))}
                <Button
                  variant="primary"
                  onClick={addParentsFields}
                  //style={{ backgroundColor: "rgb(0, 176, 240)" }}
                  style={{ backgroundColor: "#022855" }}
                  className="mt-4"
                >
                  הוסף
                </Button>
              </Col>
            </Row>
          </div>
          <div className="gallery">
            <Form.Group controlId="mainField">
              <h3>גלריה</h3>
            </Form.Group>

            {picturesFields.map((field, index) => (
              <Form.Group controlId={`picturesFields${index}`} key={index}>
                <Form.Label>:תמונה</Form.Label>
                <Form.Control
                  {...register(`picturesFields[${index}].value`)}
                  type="file"
                />
              </Form.Group>
            ))}

            <Button
              variant="primary"
              onClick={addPicturesFields}
              style={{ backgroundColor: "#022855" }}
              className="mt-4"
            >
              הוסף
            </Button>
          </div>
          <div className="stories">
            <h3>סיפורים</h3>
            {errors.title && (
              <Form.Text className="text-danger blue-form-part">
                {errors.title.message}
              </Form.Text>
            )}
            <InputGroup className="mb-3" size="lg">
              <Form.Control
                type="text"
                {...register("title")}
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
              <InputGroup.Text id="inputGroup-sizing-lg ">
                :כותרת
              </InputGroup.Text>
            </InputGroup>
            {errors.date && (
              <Form.Text className="text-danger blue-form-part">
                {errors.date.message}
              </Form.Text>
            )}
            <InputGroup size="lg">
              <Form.Control {...register("date")} type="date" />
              <InputGroup.Text>:תאריך</InputGroup.Text>
            </InputGroup>
            <InputGroup className="mb-3" size="lg">
              <Form.Control
                as="textarea"
                rows={3}
                {...register("text")}
                aria-label="Large"
                aria-describedby="inputGroup-sizing-sm"
              />
              <InputGroup.Text id="inputGroup-sizing-lg ">תוכן</InputGroup.Text>
              {errors.text && (
                <Form.Text className="text-danger blue-form-part">
                  {errors.text.message}
                </Form.Text>
              )}
            </InputGroup>
            <Form.Group className="mb-3">
              <Form.Label>:תמונה</Form.Label>
              <Form.Control {...register("imagePath")} type="file" size="lg" />
            </Form.Group>
          </div>
          <Button
            size="lg"
            variant="primary"
            type="submit"
            className="my-4"
            style={{ backgroundColor: "#022855" }}
          >
            Submit
          </Button>
        </Form>
      </Container>
         
    </div>
  );
};

export default MemoryPageForm;
