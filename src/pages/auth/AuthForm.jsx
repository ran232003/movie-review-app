import React, { useEffect } from "react";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import GenericInput from "../../global/GenericInput";
import { getInitValues, yupSchema } from "../../global/helperFunction";
import FormComponent from "./components/FormComponent";
import { useApiHelper } from "../../global/apiHelper";
import { AUTH_URL } from "../../URLS";
import { useDispatch } from "react-redux";
import { userAction } from "../../store/userSlice";
import PageWrapper from "../../global/PageWrapper ";
import { toastAction } from "../../store/toastSlice";

const AuthForm = () => {
  const location = useLocation();
  const isSignup = location.pathname === "/auth/signup";
  const { handleApiCall } = useApiHelper();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let initialValues = getInitValues(location.pathname);

  const validationSchema = yupSchema(isSignup ? "signup" : "signin");
  const handleSubmit = (values) => {
    let url = `${AUTH_URL}${isSignup ? "signup" : "signin"}`;
    handleApiCall(
      "POST",
      url,
      values,
      (data) => {
        dispatch(userAction.setUser(data.user));

        navigate("/");
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <PageWrapper>
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row className="w-100">
          <Col xs={12} md={8} lg={6} className="mx-auto">
            <Card className="p-4 shadow-lg" style={{ maxWidth: "70%" }}>
              <h2 className="text-center">
                {isSignup ? "Sign Up" : "Sign In"}
              </h2>
              <FormComponent
                isSignup={isSignup}
                handleSubmit={handleSubmit}
                validationSchema={validationSchema}
                initialValues={initialValues}
              />

              {/* Switch between Sign In and Sign Up */}
              <div className="text-center mt-3">
                <p>
                  {isSignup
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <Link to={isSignup ? "/auth/signin" : "/auth/signup"}>
                    {isSignup ? "Sign In" : "Sign Up"}
                  </Link>
                </p>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  );
};

export default AuthForm;
