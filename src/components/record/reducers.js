let initialState = {};

export default (state = initialState, action) => {

  let { type, payload = {} } = action;
  let { id, model, records } = payload;

  switch (type) {
    case "GET":
      return { ...state, [model]: records };

    case "POST":
      return {
        ...state, [model]: state[model] ? [...state[model], records] : [records]
      };

    case "DELETE":
      let deleteList = state[model].filter((r, idx) => idx !== id);
      return { ...state, [model]: deleteList };

    case "PUT":
      let putList = state[model].map((entry, idx) => (idx === id ? records : entry));
      return { ...state, [model]: putList };

    case "PATCH":
      return state;

    default:
      return state;
  }
};
