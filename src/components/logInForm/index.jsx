import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useSignIn } from "react-auth-kit";
import { postDataToDatabase } from "../../services/apiFetcher.jsx";

const schema = yup.object().shape({
  email: yup.string().required("אימייל חובה").email("פורמט האימייל שגוי"),
  password: yup
    .string()
    .required("סיסמה חובה")
    .min(4, " סיסמה חייבת להיות לפחות 4 תווים"),
});

const LogInForm = ({ handleModalClose }) => {
  const signIn = useSignIn();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const endpoint = `http://localhost:3000/api/login`;
      const dataToUpdate = {
        email: data.email,
        password: data.password,
      };

      const dbUserData = await postDataToDatabase(endpoint, dataToUpdate);

      signIn({
        expiresIn: dbUserData.expiresIn,
        tokenType: "Bearer",
        token: dbUserData.token,
        authState: {
          email: dbUserData.user.email,
          name: dbUserData.user.name,
          imgPath: dbUserData.user.imgPath,
          id: dbUserData.user.id,
          connectionType: "registered",
          role: dbUserData.user.role,
          permissions: dbUserData.user.permissions,
        },
      });

      // Clear error message if login is successful
      // setErrorMessage("");
      handleModalClose();
    } catch (error) {
      // Handle login error
      setErrorMessage("אימייל או סיסמה שגויים");
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col
          xs={12}
          md={6}
          style={{
            backgroundColor: "#022855",
            padding: "3%",
            borderRadius: "10px",
            marginBottom: "",
            width: "70%",
            margin: "5% 0%",
          }}
        >
          <Form
            onSubmit={handleSubmit(onSubmit)}
            style={{ backgroundColor: "inherit" }}
          >
            <Form.Group
              controlId="email"
              style={{ backgroundColor: "inherit" }}
            >
              <Form.Label
                style={{ backgroundColor: "inherit", color: "white" }}
              >
                אימייל
              </Form.Label>
              <input
                {...register("email")}
                type="text"
                placeholder="Enter your email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
              />
              {errors.email && (
                <div
                  style={{ backgroundColor: "inherit" }}
                  className="invalid-feedback"
                >
                  {errors.email.message}
                </div>
              )}
            </Form.Group>

            <Form.Group
              controlId="password"
              style={{ backgroundColor: "inherit" }}
            >
              <Form.Label
                style={{ backgroundColor: "inherit", color: "white" }}
              >
                סיסמה
              </Form.Label>
              <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              {errors.password && (
                <div
                  className="invalid-feedback"
                  style={{ backgroundColor: "inherit" }}
                >
                  {errors.password.message}
                </div>
              )}
            </Form.Group>

            {errorMessage && (
              <div className="alert alert-danger" style={{ marginTop: "10px" }}>
                {errorMessage}
              </div>
            )}

            <Button
              type="submit"
              style={{
                marginTop: "6%",
                backgroundColor: "#00b3bf",
                border: "none",
              }}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LogInForm;
