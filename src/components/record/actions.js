import superagent from "superagent";

export const get = payload => dispatch => {
  return superagent
    .post(payload.url)
    .send(payload.record)
    .then(data => {
      dispatch(getAction(payload, data));
    })
    .catch(console.error);
};

export const post = payload => dispatch => {
  return superagent
    .post(payload.url)
    .send(payload.record)
    .then(data => {
      dispatch(postAction(payload, data));
    })
    .catch(console.error);
};

export const destroy = payload => dispatch => {
  return superagent
    .post(payload.url)
    .send(payload.record)
    .then(data => dispatch(deleteAction(payload)))
    .catch(console.error);
};

export const put = payload => dispatch => {
  return superagent
    .put(payload.url)
    .send(payload.record)
    .then(data => {
      dispatch(putAction(payload, data));
    })
    .catch(console.error);
};

const getAction = (payload, data) => {
  return {
    type: "GET",
    payload: {
      model: payload.model,
      data: data.body
    }
  };
};

const postAction = (payload, data) => {
  return {
    type: "POST",
    payload: {
      model: payload.model,
      data: data.body
    }
  };
};

const deleteAction = payload => {
  return {
    type: "DELETE",
    payload: {
      model: payload.model,
      id: payload.id
    }
  };
};

const putAction = (payload, data) => {
  return {
    type: "PUT",
    payload: {
      model: payload.model,
      id: payload.id,
      data: data.body
    }
  };
};
