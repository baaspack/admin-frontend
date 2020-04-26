import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  backpackActions,
  wsActions,
  collectionsActions,
  backpackUserActions,
} from '../../_actions';

import { websocketConstants } from '../../_constants';

import Host from './Host';
import PropertyEditModal from './DocumentEditModal';
import BackpackUsers from './Users';
import Collections from './Collections';

import styles from './index.module.css';

class Backpack extends Component {
  state = {
    showModal: false,
    modalCollection: null,
    modalDoc: null,
  };

  componentDidMount() {
    const { get, wsConnect } = this.props;
    const { backpackName } = this.props.match.params;

    get(backpackName)
      .then(() => {
        const hostname = window.location.host;
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        wsConnect(`${protocol}://${hostname.replace('admin', 'admin-be')}/backpacks/${backpackName}`);
      })
  };

  componentWillUnmount() {
    const { clearCollections, clearUsers } = this.props;
    clearCollections();
    clearUsers();
  }

  toggleShowModal = (modalCollection, modalDoc) => {
    this.setState((prevState) => {
      return {
        modalCollection,
        modalDoc,
        showModal: !prevState.showModal,
      }
    });
  };

  ui = () => {
    const { backpack, websocket } = this.props;
    const { showModal, modalCollection, modalDoc } = this.state;

    let pageContent;

    if (backpack.name) {
      if (websocket.status === websocketConstants.CONNECTED_STATUS) {
        pageContent = this.fullUI();
      } else {
        pageContent = this.loadingUI();
      }
    } else {
      pageContent = this.orphanUI();
    }

    return (
      <Fragment>
        {pageContent}

        {
          showModal &&
          <PropertyEditModal
            onCloseClick={this.toggleShowModal}
            collection={modalCollection}
            document={modalDoc}
          />
        }
      </Fragment>
    )
  }

  orphanUI = () => {
    return <h1 className={styles.header}>backpack : Loading...</h1>;
  }

  loadingUI = () => {
    const { backpack } = this.props;

    return (
      <Fragment>
        <h1 className={styles.header}>backpack : {backpack.name}</h1>
        <p>{this.loadingMessage()}</p>
      </Fragment>
    )
  }

  loadingMessage = () => {
    const { status } = this.props.websocket;

    if (status === websocketConstants.CONNECTING_STATUS) {
      return 'Loading backpack data...';
    } else if (status === websocketConstants.RECONNECTING_STATUS) {
      return 'Connection lost, reconnecting to backpack data...';
    } else if (status === websocketConstants.CONNECTION_LOST_STATUS) {
      return "We couldn't connect to the backpack, please refresh the page to try again.";
    }
  }

  fullUI = () => {
    const { backpack } = this.props;

    return (
      <Fragment>
        <h1 className={styles.header}>backpack : {backpack.name}</h1>

        <Host backpackName={backpack.name} />
        <BackpackUsers />
        <Collections toggleShowModal={this.toggleShowModal} />
      </Fragment>
    )
  }

  render() {
    return (
      <div className="backpack">
        {this.ui()}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  const { backpack, websocket } = state;

  return { backpack, websocket };
};

const actionCreators = {
  get: backpackActions.get,
  clearCollections: collectionsActions.clearAll,
  clearUsers: backpackUserActions.clearAll,
  wsConnect: wsActions.connect,
};

export default connect(mapStateToProps, actionCreators)(withRouter(Backpack));
