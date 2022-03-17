import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { authenticationService } from "@/_services";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // rediriger vers l'accueil si déjà connecté
    if (authenticationService.currentUserValue) {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <div className="alert alert-info">
          <strong>Normal Client</strong> - U: client P: client
          <br />
          <strong>Administrator</strong> - U: admin P: admin
        </div>
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required("Username is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
            setStatus();
            authenticationService.login(username, password).then(
              (user) => {
                const { from } = this.props.location.state || {
                  from: { pathname: "/" },
                };
                this.props.history.push(from);
              },
              (error) => {
                setSubmitting(false);
                setStatus(error);
              },
            );
          }}
          render={({ errors, status, touched, isSubmitting }) => (
            <Form>
              <h3>Connexion</h3>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field
                  name="username"
                  type="text"
                  className={
                    "form-control" +
                    (errors.username && touched.username ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary btn-block"
              >
                Login
              </button>
              <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
              </p>
            </Form>
          )}
        />
      </div>
    );
  }
}

export { LoginPage };
