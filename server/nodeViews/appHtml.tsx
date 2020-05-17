const renderHtmlApp = (htmlDom: string, preloadedState: any) => {
  const nodeSSRState = preloadedState
  ? JSON.stringify(preloadedState).replace(/</g, '\\u003c')
  : {};

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <title>Set up React, Webpack, and Babel</title>
    </head>
    <body>
      <div id="container">${htmlDom}</div>
      <script>
        window.__INITIAL_STATE__ = ${nodeSSRState};
      </script>
  </html>
  `;
};

const renderLazyApp = (htmlDom: string, webExtractor: any) => {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Set up React, Webpack, and Babel</title>
        ${webExtractor.getLinkTags()}
        ${webExtractor.getStyleTags()}
    </head>
    <body>
      <div id="container">${htmlDom}</div>
      ${webExtractor.getScriptTags()}
    </body>
    </html>`;
}

export {
  renderHtmlApp,
};
