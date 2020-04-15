import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { collectionsActions } from '../../_actions';

import AddCollectionForm from './AddCollectionForm';
import Collection from './Collection';

function Collections ({
  backpack,
  collections,
  addCollection,
  toggleShowModal
}) {
  const collectionNames = Object.keys(collections);

  return (
    <Fragment>
      <h2>Collections</h2>
      <AddCollectionForm onSubmit={addCollection}/>

      {
        collectionNames
          .map((colName) => (
            <Collection
              key={`${backpack.name}-${colName}`}
              name={colName}
              onToggleShowModal={toggleShowModal}
            />
        ))
      }
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  const { backpack, collections } = state;

  return { backpack, collections };
};

const actionCreators = {
  addCollection: collectionsActions.addCollection,
};

export default connect(mapStateToProps, actionCreators)(Collections);
