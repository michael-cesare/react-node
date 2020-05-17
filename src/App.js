import React, { Component } from 'react';
// import loadable from '@loadable/component';

import Form from './components/Form';
// const Form = loadable(() => import('./components/Form' /* webpackChunkName: 'Form' */));

// https://github.com/alexnm/react-ssr/blob/master/src/components/Layout.js

class App extends Component {
    constructor() {
        super();
        this.state = {
            title: "Welcome to React SSR!",
        };
    }

    render() {
        const { title } = this.state;

        return (
            <div>
                <h1>{title}</h1>
                <span>lazy load testing</span>
                <Form />
            </div>
        );
    }
}

export default App;