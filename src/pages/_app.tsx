import '../styles/main.css';

import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';

const NextApp: React.FC<AppProps> = (props) => {
  return (
    <React.Fragment>
      <props.Component {...props.pageProps} />
    </React.Fragment>
  );
};

// ts-prune-ignore-next
export default NextApp;
