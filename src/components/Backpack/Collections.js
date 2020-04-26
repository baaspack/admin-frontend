import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import { collectionsActions } from '../../_actions';

import AddCollectionForm from './AddCollectionForm';
import Collection from './Collection';

import styles from './collections.module.css';

function Collections ({
  backpack,
  collections,
  addCollection,
  toggleShowModal
}) {
  const collectionNames = Object.keys(collections);

  return (
    <Fragment>
      <h2 className={styles.header}>collections</h2>
      <AddCollectionForm onSubmit={addCollection}/>

      <div className={styles.collections}>
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
      </div>
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
