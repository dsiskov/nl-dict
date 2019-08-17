import React from "react";
import { Input } from "reactstrap";
import PropTypes from 'prop-types';

const InputWithOptions = props => (
  <div>
    <Input
      type="text"
      list="suggested_words_list"
      onFocus={props.handleOnFocus}
      onChange={props.handleOnChange}
      value={props.term}
    />
    <datalist id="suggested_words_list">
      {props.options.slice(0, props.suggestionCount).map(o => (
        <option value={o.text} key={o.key} />
      ))}
    </datalist>
  </div>
);

InputWithOptions.propTypes = {
    handleOnFocus: PropTypes.func.isRequired,
    handleOnChange: PropTypes.func.isRequired,
    options: PropTypes.array,
    suggestionCount: PropTypes.number,
    term: PropTypes.string
  };

  InputWithOptions.defaultProps = {
    suggestionCount: 5,
    options: []
  };
export default InputWithOptions;
