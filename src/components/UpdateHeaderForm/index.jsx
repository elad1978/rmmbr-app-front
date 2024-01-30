import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { updateDataInDatabase } from "../../services/apiFetcher.jsx";
import { useMemoryWallContext } from "../../contexts/MemoryWallContexts.jsx";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("שדה כותרת הוא שדה חובה"),
});

function UpdateHeaderForm({ closeTitleInput, memoryWallId, index }) {
  const { memoryWalls, setMemoryWalls } = useMemoryWallContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    const endpoint = `http://localhost:3000/api/getMemoryWallById/${memoryWallId}/title`; // Replace with your actual endpoint
    const dataToUpdate = {
      title: data.title,
    };
    (async () => {
      try {
        await updateDataInDatabase(endpoint, dataToUpdate);
        closeTitleInput();
        memoryWalls[index].title = data.title;
        setMemoryWalls(memoryWalls);
      } catch (error) {
        console.error(error.message);
      }
    })();
  };

  return (
    <div className="container" style={{ border: "none" }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="title" style={{ border: "none" }}>
          <Form.Label>
            <h3>:עריכת כותרת</h3>
          </Form.Label>
          <Controller
            name="title"
            control={control}
            defaultValue={memoryWalls[index].title}
            render={({ field }) => (
              <Form.Control
                type="text"
                autoFocus
                onFocus={(e) => {
                  e.target.select();
                }}
                className={errors.title ? "is-invalid" : ""}
                {...field}
              />
            )}
          />
          {errors.title && (
            <Form.Control.Feedback type="invalid">
              {errors.title.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          style={{ backgroundColor: " #022855" }}
        >
          שמירה
        </Button>
      </Form>
    </div>
  );
}

export default UpdateHeaderForm;
