/* eslint-disable react/prefer-stateless-function, jsx-a11y/html-has-lang, react/prop-types, no-console, react/no-danger */

import React from 'react';
import fav from './assets/favicon.png';

export default class HTML extends React.Component {
  render() {
    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="icon" type="image/png" href={fav} sizes="32x32" />
          <link rel="icon" type="image/png" href={fav} sizes="96x96" />
          {this.props.headComponents}
          <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key="body"
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js?features=IntersectionObserver" />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html:
                'window.netlifyIdentity&&window.netlifyIdentity.on("init",function(n){n||window.netlifyIdentity.on("login",function(){document.location.href="/admin/"})});',
            }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
