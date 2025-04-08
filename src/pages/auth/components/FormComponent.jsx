import React from "react";
import PropTypes from "prop-types";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import GenericInput from "../../../global/GenericInput";
import { Formik } from "formik";
import { authFormArray } from "../../../global/helperFunction";

function FormComponent({
  initialValues,
  validationSchema,
  handleSubmit,
  isSignup,
}) {
  const filteredFormArray = authFormArray.filter((item) => {
    if (item.name === "confirmPassword") {
      return isSignup; // Only include confirmPassword if isSignup is true
    }
    return true; // Include all other fields
  });
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true} // ✅ This will reset values when switching
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        touched,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          {filteredFormArray.map((item, index) => {
            return (
              <GenericInput
                key={index}
                label={item.label}
                type={item.type}
                name={item.name}
                value={values[item.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched[item.name] && errors[item.name]}
              />
            );
          })}

          <Button variant="primary" type="submit" className="w-100">
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}

FormComponent.propTypes = {};

export default FormComponent;
