import { deployConstants } from '../_constants';
import makeAction from './actionHelper';

const uploadStarted = () => {
  return makeAction(deployConstants.DEPLOY_UPLOAD_STARTED);
}

const uploadCompleted = () => {
  return makeAction(deployConstants.DEPLOY_UPLOAD_COMPLETED);
}

const deploymentComplete = () => {
  return makeAction(deployConstants.DEPLOY_DEPLOYMENT_COMPLETE);
}

const allocatedSSL = () => {
  return makeAction(deployConstants.DEPLOY_ALLOCATED_SSL);
}

const completed = () => {
  return makeAction(deployConstants.DEPLOY_COMPLETED);
}

const failed = () => {
  return makeAction(deployConstants.DEPLOY_FAILED);
}

const stepMachine = {
  [deployConstants.NOT_DEPLOYING_STATUS]: uploadStarted,
  [deployConstants.UPLOADING_STATUS]: uploadCompleted,
  [deployConstants.DEPLOYING_STATUS]: deploymentComplete,
  [deployConstants.ALLOCATING_SSL_STATUS]: allocatedSSL,
  [deployConstants.ALLOCATED_SSL_STATUS]: completed,
}

const nextStep = (currentStep) => {
  const next = stepMachine[currentStep];

  console.log(currentStep)

  if (next) {
    return next();
  } else {
    const error = new Error(
      `Invalid state transition attempted, from state ${currentStep}`
    );

    throw error;
  }
}

export const deployActions = {
  allocatedSSL,
  completed,
  deploymentComplete,
  failed,
  nextStep,
  uploadCompleted,
  uploadStarted,
};
