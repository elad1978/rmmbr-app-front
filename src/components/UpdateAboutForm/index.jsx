import React, { useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { updateDataInDatabase } from "../../services/apiFetcher.jsx";
import { useMemoryWallContext } from "../../contexts/MemoryWallContexts.jsx";

const validationSchema = Yup.object().shape({
  aboutText: Yup.string(),
});

function UpdateAboutForm({ closeAboutInput, memoryWallId, index }) {
  const { memoryWalls, setMemoryWalls } = useMemoryWallContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const textAreaRef = useRef(null);

  useEffect(() => {
    // When the component mounts, focus on the text area.
    if (textAreaRef.current) {
      textAreaRef.current.focus();
      textAreaRef.current.select();
    }
  }, []);

  useEffect(() => {}, [memoryWalls]);

  const onSubmit = (data) => {
    const endpoint = `http://localhost:3000/api/getMemoryWallById/${memoryWallId}/about`; // Replace with your actual endpoint
    const dataToUpdate = {
      aboutText: data.aboutText,
    };
    console.log(data.aboutText);
    console.log(dataToUpdate);
    (async () => {
      try {
        const aboutData = await updateDataInDatabase(endpoint, dataToUpdate);
        console.log(aboutData);
        closeAboutInput();
        memoryWalls[index].about = data.aboutText;
        setMemoryWalls(memoryWalls);
      } catch (error) {
        console.error(error.message);
      }
    })();
  };

  return (
    <div className="container" style={{ border: "none" }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="aboutText" style={{ border: "none" }}>
          <Form.Label>
            <h3>:עריכת אודות</h3>
          </Form.Label>
          <Controller
            name="aboutText"
            control={control}
            defaultValue={memoryWalls[index].about}
            render={({ field }) => (
              <Form.Control
                as="textarea"
                rows={3}
                className={errors.aboutText ? "is-invalid" : ""}
                {...field}
                ref={textAreaRef} // Set the ref here
              />
            )}
          />
          {errors.aboutText && (
            <Form.Control.Feedback type="invalid">
              {errors.aboutText.message}
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

export default UpdateAboutForm;

// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { Form, Button } from "react-bootstrap";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as Yup from "yup";
// import { updateDataInDatabase } from "../../services/apiFetcher.jsx";
// import { useMemoryWallContext } from "../../contexts/MemoryWallContexts.jsx";

// const validationSchema = Yup.object().shape({
//   aboutText: Yup.string(),
// });

// function UpdateAboutForm({ closeAboutInput, memoryWallId, index }) {
//   const { memoryWalls, setMemoryWalls } = useMemoryWallContext();
//   const {
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(validationSchema),
//   });

//   const onSubmit = (data) => {
//     const endpoint = `http://localhost:3000/api/getMemoryWallById/${memoryWallId}/about`; // Replace with your actual endpoint
//     const dataToUpdate = {
//       aboutText: data.aboutText,
//     };
//     console.log(data.aboutText);
//     console.log(dataToUpdate);
//     (async () => {
//       try {
//         const aboutData = await updateDataInDatabase(endpoint, dataToUpdate);
//         console.log(aboutData);
//         closeAboutInput();
//         memoryWalls[index].about = data.aboutText;
//         setMemoryWalls(memoryWalls);
//       } catch (error) {
//         console.error(error.message);
//       }
//     })();
//   };

//   return (
//     <div className="container" style={{ border: "none" }}>
//       <Form onSubmit={handleSubmit(onSubmit)}>
//         <Form.Group controlId="aboutText" style={{ border: "none" }}>
//           <Form.Label>
//             <h3>:עריכת כותרת</h3>
//           </Form.Label>
//           <Controller
//             name="aboutText"
//             control={control}
//             defaultValue={memoryWalls[index].about}
//             render={({ field }) => (
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 autoFocus
//                 className={errors.aboutText ? "is-invalid" : ""}
//                 {...field}
//               />
//             )}
//           />
//           {errors.aboutText && (
//             <Form.Control.Feedback type="invalid">
//               {errors.aboutText.message}
//             </Form.Control.Feedback>
//           )}
//         </Form.Group>
//         <Button
//           type="submit"
//           variant="primary"
//           className="mt-2"
//           style={{ backgroundColor: " #022855" }}
//         >
//           שמירה
//         </Button>
//       </Form>
//     </div>
//   );
// }

// export default UpdateAboutForm;
