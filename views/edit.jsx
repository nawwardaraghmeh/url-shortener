import React from "react";

function Edit({ shortUrl }) {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossorigin="anonymous"
        />
        <title>URL Shortener</title>
      </head>
      <body>
        <div className="container">
          <h1>Edit Short URL</h1>
          <form action={`/urls/${shortUrl._id}`} method="POST">
            <label htmlFor="fullUrl">Full URL:</label>
            <input
              required
              type="url"
              name="fullUrl"
              id="fullUrl"
              defaultValue={shortUrl.full}
            />
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </form>
        </div>
      </body>
    </html>
  );
}

export default Edit;
