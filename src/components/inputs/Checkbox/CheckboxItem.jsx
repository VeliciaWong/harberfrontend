import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import gray from '@material-ui/core/colors/grey';

const styles = {
  root: {
    color: gray[600],
    '&$checked': {
      color: gray[700],
    },
  },
  checked: {},
};

class CheckboxItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleCheckboxChange = (event) => {
    const { checkboxChangeCallback } = this.props;
    checkboxChangeCallback(event.target.checked);
  };

  render() {
    const { classes, checkboxValue, checkboxLabel, checked } = this.props;
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={checked}
            onChange={this.handleCheckboxChange}
            value={checkboxValue}
            classes={{
              root: classes.root,
              checked: classes.checked,
            }}
            className="w-[50px] h-[37px]"
          />
        }
        label={checkboxLabel}
      />
    )
  }
}

export default withStyles(styles)(CheckboxItem);

CheckboxItem.propTypes = {
  classes: PropTypes.object.isRequired,
  checkboxLabel: PropTypes.string.isRequired,
  checkboxValue: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  handleCheckboxChange: PropTypes.func,
};
CheckboxItem.defaultProps = {
  handleCheckboxChange: null,
};