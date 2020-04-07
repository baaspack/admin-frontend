const makeAction = (type, payloadBody) => {
  return {
    type,
    payload: payloadBody,
  }
};

export default makeAction;
