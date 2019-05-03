import React from "react";
import { connect } from "react-redux";
import superagent from 'superagent';

import Form from "react-jsonschema-form";

import * as actions from "./actions.js";

const uiSchema = {
  _id: { "ui:widget": "hidden" },
  __v: { "ui:widget": "hidden" }
};


const source = 'https://js401.herokuapp.com/api/v1';

class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schema: {} };
  }

  resetPlayer = id => {
    this.setState({ id: null });
  };

  async componentDidMount() {
    let url = `${source}/${this.props.model}/schema`;
    let schema = await get(url);
    this.setState({ schema });
  }

  handleSubmit = form => {
    let data = form.formData;
    if (parseInt(this.props.id) >= 0) {
      let url = `${source}/${this.props.model}/${data._id}`
      this.props.handlePut({
        url: url,
        id: this.props.id,
        model: this.props.model,
        record: data
      });
    } else {
      let url = `${source}/${this.props.model}`
      this.props.handlePost({
        url: url,
        model: this.props.model,
        record: data,
      });
      this.props.handlePost({ model: this.props.model, record: formData });
    }
  };

  render() {
    return (
      <div>
        <h3>
          {this.props.id >= 0 ? 'Edit' : 'Add'} Record {this.props.id}
        </h3>        
        <Form
          schema={this.state.schema}
          uiSchema={uiSchema}
          formData={
            this.props.records[this.props.model] &&
            this.props.records[this.props.model][this.props.id]
          }
          onSubmit={this.handleSubmit}
        />      
      </div>
    );
  }
}

const get = source => {
  return superagent
    .get(source)
    .then(result => result.body)
    .catch(console.error);
};

const mapStateToProps = state => ({
  records: state.records
});

const mapDispatchToProps = (dispatch, getState) => ({
  handlePost: payload => dispatch(actions.post(payload)),
  handlePut: payload => dispatch(actions.put(payload)),
  handlePatch: payload => dispatch(actions.patch(payload))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Record);
