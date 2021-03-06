const renderHtmlApp = (htmlDom: string, preloadedState: any, webExtractor: any) => {
  const nodeSSRState = preloadedState
  ? JSON.stringify(preloadedState).replace(/</g, '\\u003c')
  : {};

  const scriptTags = webExtractor.getScriptTags();
  const linkTags = webExtractor.getLinkTags();
  const styleTags = webExtractor.getStyleTags();

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <title>Set up React, Webpack, and Babel</title>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      ${linkTags}
      ${styleTags}
    </head>
    <body>
      <div id="container">${htmlDom}</div>
      <script>
        window.__INITIAL_STATE__ = ${nodeSSRState};
      </script>
      ${scriptTags}
  </html>
  `;
};

export {
  renderHtmlApp,
};
