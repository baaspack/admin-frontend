// @flow
import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

export function LandingPad({ htmlId }) {
  return <div id={htmlId} />;
}

export function Portal({ children, htmlId }) {
  const elRef = useRef(document.createElement('div'));
  const rootRef = useRef();

  useEffect(() => {
    const el = elRef.current;

    rootRef.current = document && document.getElementById(htmlId);
    rootRef.current && rootRef.current.appendChild(elRef.current);

    return () => {
      rootRef.current && rootRef.current.removeChild(el);
    };
  }, [htmlId]);

  return ReactDOM.createPortal(children, elRef.current);
}

LandingPad.defaultProps = {
  htmlId: 'portal-root'
};

Portal.defaultProps = {
  htmlId: 'portal-root'
};
