import React from 'react';

import PropTypes from 'prop-types';

export const Checkbox = ({ labelText, checked = false, onChange, id }) => {
  return (
    <div className='form-check'>
      <input
        className='form-check-input'
        type='checkbox'
        id={id}
        checked={checked}
        onChange={onChange}
      />
      <label className={'form-check-label'} htmlFor={id}>
        {labelText}
      </label>
    </div>
  );
};
