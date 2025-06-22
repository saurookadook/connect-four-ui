import * as React from 'react';

function BaseInputEl(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>,
) {
  const { minLength = 5, size = 40, ...nativeProps } = props;
  return <input {...nativeProps} minLength={minLength} size={size} ref={ref} />;
}

export const BaseInput = React.forwardRef(BaseInputEl);
