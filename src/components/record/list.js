import React from "react";
import { connect } from "react-redux";

import style from "./record.module.scss";
import If from "./if.js";

import Record from "./record.js";
import * as actions from "./actions.js";

const source = "https://api-js401.herokuapp.com/api/v1"

class Records extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: null };
  }

  deleteRecord = id => {
    const url = `${source}/${this.props.model}/${id}`
    this.props.handleDelete({ url: url, model: this.props.model, id: id });
  };

  editRecord = id => {
    this.setState({ id });
  };

  componentDidMount(){
    let url = `${source}/${this.props.model}`
    this.props.getAll({
      url: url,
      model: this.props.model
    })
  }

  reset = () => {
    let id = null;
    this.setState({ id });
  };

  render() {
    const isModelThere = model => {
      return this.props.records.hasOwnProperty(model) ? this.props.records[model] : [];
    };

    let records = isModelThere(this.props.model);

    return (
      <div className={style}>
        <button onClick={this.reset}>Add New</button>
        <If conditions = {records}>
          <ul className={style.list}>
            {records.map((record, idx) => (
              <li key={idx}>
                {record.name}
                <button onClick={() => this.editRecord(idx)}>Edit</button>
                <button onClick={() => this.deleteRecord(idx)}>Delete</button>
              </li>
            ))}
          </ul>
        </If>
        <Record model={this.props.model} id={this.state.id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  records: state.records
});

const mapDispatchToProps = (dispatch, getState) => ({
  handleDelete: id => dispatch(actions.destroy(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Records);
