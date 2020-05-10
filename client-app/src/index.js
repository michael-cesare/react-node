import React from "react";
import ReactDOM from "react-dom";
import Form from "./js/components/Form";
import logger from '../util/logger';

const bootstrapApp = (renderMethod) => {
  logger.hit('[index] - bootstrapApp');
  const wrapper = document.getElementById("container");
  if (wrapper) {
    renderMethod(<Form />, wrapper);
  }
};

bootstrapApp(ReactDOM.render);
