import React from "react";

function Login({ messages }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossorigin="anonymous"
        />
      </head>
      <body>
        <div className="container mt-4">
          <section className="background-radial-gradient overflow-hidden">
            <style>
              {`
            .background-radial-gradient {
              background-color: hsl(218, 41%, 15%);
              background-image: radial-gradient(
                650px circle at 0% 0%,
                hsl(218, 41%, 35%) 15%,
                hsl(218, 41%, 30%) 35%,
                hsl(218, 41%, 20%) 75%,
                hsl(218, 41%, 19%) 80%,
                transparent 100%
              ),
              radial-gradient(
                1250px circle at 100% 100%,
                hsl(218, 41%, 45%) 15%,
                hsl(218, 41%, 30%) 35%,
                hsl(218, 41%, 20%) 75%,
                hsl(218, 41%, 19%) 80%,
                transparent 100%
              );
            }

            .bg-glass {
              background-color: hsla(0, 0%, 100%, 0.9) !important;
              backdrop-filter: saturate(200%) blur(25px);
            }
          `}
            </style>

            <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                  <form action="/index" method="POST">
                    {/* error message  */}
                    <div className="row">
                      {messages.error && (
                        <div className="alert alert-danger">
                          <strong>{messages.error}</strong>
                        </div>
                      )}
                      <h1 className="mb-3 h3">Login</h1>
                    </div>

                    {/* email */}
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        name="email"
                        id="emailForm"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="emailForm">
                        Email address
                      </label>
                    </div>

                    {/* password */}
                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        name="password"
                        id="pwForm"
                        className="form-control"
                      />
                      <label className="form-label" htmlFor="pwForm">
                        Password
                      </label>
                    </div>

                    {/* submit button */}
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mb-4"
                    >
                      Sign In
                    </button>

                    {/* register button */}
                    <div className="text-center">
                      <p>
                        Don't have an account yet?{" "}
                        <a href="/register">Register</a>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </body>
    </html>
  );
}
export default Login;
