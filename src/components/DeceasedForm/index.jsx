import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Button } from "react-bootstrap";
import {
  putDataWithFileToDatabase,
  postDataWithFileToDatabase,
} from "../../services/apiFetcher";
//import { useMemoryWallContext } from "../../contexts/MemoryWallContexts";
import "./index.css";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  imgPath: yup.mixed().required("image is required"),
  donationAmount: yup
    .number()
    .typeError("Donation amount must be a number")
    .required("Donation amount is required"),
});

const DeceasedForm = ({
  onCancel,
  deceased,
  memoryWallId,
  index,
  dIndex,
  updateCard,
  hight,
  width,
  isNewCard,
  addNewDeceasedCardToMemoryWall,
}) => {
  //const { memoryWalls, setMemoryWalls } = useMemoryWallContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log(data.imgPath);
    const endpoint = `http://localhost:3000/api/getMemoryWallById/${memoryWallId}/deceasedsInfo/${
      !isNewCard ? deceased.id : ""
    }`;
    console.log(data.imgPath);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("donationAmount", data.donationAmount);
      formData.append("imgPath", data.imgPath);
      if (!isNewCard) {
        const updatedData = await putDataWithFileToDatabase(endpoint, formData);
        console.log("Data updated successfully:", updatedData);
        updateCard(updatedData);
      } else {
        const newCardData = await postDataWithFileToDatabase(
          endpoint,
          formData
        );
        console.log("Data was added successfully:", newCardData);

        addNewDeceasedCardToMemoryWall(newCardData.newDeceased);
      }
    } catch (error) {
      console.error("Error updating data:", error.message);
    }
    onCancel();
  };

  return (
    <div
      style={{ hight: hight, width: width }}
      className="div-container background-color-my-gray"
    >
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="background-color-my-gray"
      >
        <Form.Group
          className="name-group background-color-my-gray"
          controlId="formName"
        >
          <Form.Label className="background-color-my-gray">:שם</Form.Label>
          <Controller
            name="name"
            control={control}
            defaultValue={deceased?.name || ""}
            render={({ field }) => (
              <Form.Control {...field} className="form-control-sm" />
            )}
          />
          <Form.Text className="text-danger">{errors.name?.message}</Form.Text>
        </Form.Group>

        <Form.Group
          className="background-color-my-gray"
          controlId="formImagePath"
        >
          <Form.Label className="background-color-my-gray">:תמונה</Form.Label>
          <Controller
            name="imgPath"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Form.Control
                type="file"
                className="form-control-sm"
                accept=".jpg, .jpeg, .png"
                onChange={(e) => {
                  // Set the file value manually
                  field.onChange(e.target.files[0]);
                }}
              />
            )}
          />
          <Form.Text className="text-danger">
            {errors.imgPath?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group
          className="background-color-my-gray"
          controlId="formDonationAmount"
        >
          <Form.Label className="background-color-my-gray">
            :סכום תרומה
          </Form.Label>
          <Controller
            name="donationAmount"
            control={control}
            defaultValue={deceased?.donationAmount || ""}
            render={({ field }) => (
              <Form.Control
                type="number"
                {...field}
                className="form-control-sm"
              />
            )}
          />
          <Form.Text className="text-danger">
            {errors.donationAmount?.message}
          </Form.Text>
        </Form.Group>

        <Button type="submit" className="btn-sm submitBtn">
          Submit
        </Button>
      </Form>
      <div
        onClick={() => onCancel()}
        className="cancelBtn background-color-my-gray"
      >
        X
      </div>
    </div>
  );
};

export default DeceasedForm;
