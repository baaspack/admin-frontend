import { deployConstants } from '../_constants';

const initialState = {
  status: deployConstants.NOT_DEPLOYING_STATUS,
};

export const deployReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case deployConstants.DEPLOY_UPLOAD_STARTED:
      return {
        ...state,
        status: deployConstants.UPLOADING_STATUS,
      };

    case deployConstants.DEPLOY_UPLOAD_COMPLETED:
      return {
        ...state,
        status: deployConstants.DEPLOYING_STATUS,
      };

    case deployConstants.DEPLOY_DEPLOYMENT_COMPLETE:
      return {
        ...state,
        status: deployConstants.ALLOCATING_SSL_STATUS,
      };

    case deployConstants.DEPLOY_ALLOCATED_SSL:
      return {
        ...state,
        status: deployConstants.ALLOCATED_SSL_STATUS,
      };

    case deployConstants.DEPLOY_COMPLETED:
      return {
        ...state,
        status: deployConstants.NOT_DEPLOYING_STATUS,
      };

    case deployConstants.DEPLOY_FAILED:
      return {
        ...state,
        status: deployConstants.NOT_DEPLOYING_STATUS,
      };

    default:
      return state;
  }
}

export default deployReducer;

