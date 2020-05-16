const renderHtmlApp = (html) => {
    return `
    <!DOCTYPE html>
    <html xmlns:og="http://ogp.me/ns#" lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <title>Dhalia Real Estate Agency - test tryme</title>
      </head>
      <body>
        <div id="tryme-app">
          ${html}
        </div>
    </html>
    `;
  };
  
  export {
    renderHtmlApp,
  };
  