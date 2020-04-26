import React, { Fragment } from 'react';

import styles from './styles.module.css';

function Header () {
  return <Fragment>
    <h1 className={styles.header}>my backpacks</h1>
    <p>Find your SDK at: {`${window.location.origin}`}/sdk.js. <a href="https://github.com/baaspack/baas-sdk/blob/master/README.md" target="_blank">Learn how to use it!</a></p>
  </Fragment>
}

export default Header;
