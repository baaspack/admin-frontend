import React from 'react';
import { withRouter } from 'react-router-dom';

const Backpack = ({ match }) => {
  return (
    <div>
      Hi, I'm {match.params.backpackName}
    </div>
  );
};

export default withRouter(Backpack);
