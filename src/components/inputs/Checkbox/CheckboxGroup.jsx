import React, { Component } from 'react';
import FormGroup from '@material-ui/core/FormGroup';

import CheckboxItem from './CheckboxItem.jsx';

class CheckboxGroup extends Component {
  constructor(props) {
    super(props);
  }

  handleChildCheckboxChange = (isChecked, index) => {
    const { checkboxes } = this.props;
    const { onCheckboxGroupChange } = this.props;
    const newCheckState = checkboxes.map(
      (aCheckbox, i) => (index === i ? { ...aCheckbox, checked: isChecked } : aCheckbox)
    );
    onCheckboxGroupChange(newCheckState);
  };

  renderCheckboxes = () => {
    const { checkboxes } = this.props;
    if (!checkboxes) {
      return null;
    }
    return checkboxes.map((aCheckbox, index) => (
      <CheckboxItem
        key={index}
        checkboxLabel={aCheckbox.label}
        checkboxValue={aCheckbox.value}
        checked={aCheckbox.checked}
        checkboxChangeCallback={(checkStatus) => this.handleChildCheckboxChange(checkStatus, index)}
      />
    ));
  };

  render() {
    return (
      <div className="checkbox-wrapper">
        <FormGroup>
          <div className="checkbox-children">{this.renderCheckboxes()}</div>
        </FormGroup>
      </div>
    )
  }
}

export default CheckboxGroup;