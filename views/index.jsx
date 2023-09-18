import React from "react";

function Index({ shortUrls }) {
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
          <h1>URL Shortener</h1>
          <form action="/shorturls" method="POST" className="my-4 form-inline">
            <label htmlFor="fullUrl" className="visually-hidden">
              URL
            </label>
            <input
              required
              placeholder="URL"
              type="url"
              name="fullUrl"
              id="fullUrl"
              className="form-control col mr-2"
            />
            <button className="btn btn-success" type="submit">
              Shorten
            </button>
          </form>

          <table className="table table-striped table-responsive">
            <thead>
              <tr>
                <th>Full URL</th>
                <th>Short URL</th>
                <th>Operation</th>
              </tr>
            </thead>
            <tbody>
              {shortUrls.map((shortUrl) => (
                <tr key={shortUrl._id}>
                  <td>
                    <a href={shortUrl.full}>{shortUrl.full}</a>
                  </td>
                  <td>
                    <a href={shortUrl.short}>{shortUrl.short}</a>
                  </td>
                  <td>
                    <form
                      action={`/urls/${shortUrl._id}`}
                      method="POST"
                      style={{ display: "inline" }}
                    >
                      <input type="hidden" name="_method" value="DELETE" />
                      <button className="btn btn-danger btn-sm" type="submit">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </body>
    </html>
  );
}

export default Index;
