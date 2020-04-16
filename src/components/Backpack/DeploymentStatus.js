import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deployConstants } from '../../_constants';
import { deployActions } from '../../_actions';

import apiClient from '../../lib/apiClient';

import styles from './DeploymentStatus.module.css';

const STATUS_CHECK_INTERVAL_LENGTH = 100;

function deployUrl(backpackName) {
  return `https://${backpackName}.cpstn.dev`;
}

function DeploymentStep({ text, stepIndex }) {
  const { status } = useSelector(state => state.deploy);

  const className = status > stepIndex
    ? styles.completedStep
    : status === stepIndex
    ? styles.inProgressStep
    : undefined;

  return (
    <li className={className}>
      {text}
    </li>
  );
}

// before deployment, it is a 404

function updateStatus(dispatch, backpackName, currentStep) {
  const nextAction = deployActions.nextStep(currentStep);
  const deploymentUrl = deployUrl(backpackName);

  if (currentStep === deployConstants.UPLOADING_STATUS) {
    fetch(deploymentUrl, { method: 'GET' })
      .then(response => {
        console.log('then', response)
        return;
        // if we get a 401 instead of a 404, that means our upload has completed
        // and we are deploying it
        if (response.status === 401) {
          dispatch(nextAction);
        }

        // we are past this step if this happens, but we want to make sure we
        // don't get stuck when we should move forward
        if (response.status === 200) {
          dispatch(nextAction);
        }
      })
      .catch(err => console.error(err));

    // if uploading, then check for 404
  } else if (currentStep === deployConstants.DEPLOYING_STATUS) {
    fetch(deploymentUrl, { method: 'GET' })
      .then(response => console.log(response))
      .catch(err => console.error(err));

    fetch(deploymentUrl, { method: 'GET' })
      .then(response => {
        // we are past this step if this happens, but we want to make sure we
        // don't get stuck when we should move forward
        if (response.status === 200) {
          dispatch(nextAction);
        }
      })
      .catch(response => {
        if (response.status === 401) {
          dispatch(nextAction);
        }
      });
    // if deploying, then check for ssl error
  } else if (currentStep === deployConstants.ALLOCATING_SSL_STATUS) {
    fetch(deploymentUrl, { method: 'GET' })
      .then(response => {
        if (response.status === 200) {
          dispatch(nextAction);
        }
      })
      .catch(err => console.error(err));
    // if 200, then we are completed
  } else if (currentStep === deployConstants.ALLOCATED_SSL_STATUS) {
    nextAction();
  }
}

function StatusMonitor() {
  const status = useSelector(state => state.deploy.status);
  const backpackName = useSelector(state => state.backpack.name);
  const dispatch = useDispatch();
  const monitorIntervalRef = useRef(null);

  useEffect(() => {
    if (typeof status !== 'undefined') {
      clearInterval(monitorIntervalRef.current)

      monitorIntervalRef.current = setInterval(
        () =>  updateStatus(dispatch, backpackName, status),
        STATUS_CHECK_INTERVAL_LENGTH
      );
    }

    return () => clearInterval(monitorIntervalRef.current);
  }, [status]);

  return null;
}

function DeploymentStatus() {
  const { status } = useSelector(state => state.deploy);

  if (status === deployConstants.NOT_DEPLOYING_STATUS) {
    return null;
  }

  return (
    <section>
      <h3>Deployment Status</h3>

      <ul>
        <DeploymentStep
          text='Uploading...'
          stepIndex={deployConstants.UPLOADING_STATUS}
        />
        <DeploymentStep
          text='Deploying...'
          stepIndex={deployConstants.DEPLOYING_STATUS}
        />
        <DeploymentStep
          text='Allocating SSL certificate...'
          stepIndex={deployConstants.ALLOCATING_SSL_STATUS}
        />
        <DeploymentStep
          text='Deploy complete...'
          stepIndex={deployConstants.ALLOCATED_SSL_STATUS}
        />
      </ul>

      <StatusMonitor />
    </section>
  );
}

export default DeploymentStatus;
