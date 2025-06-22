import * as React from 'react';

const usernamePattern = /^[a-zA-Z0-9_]{5,24}$/;
const passwordPattern = /^[A-Za-z0-9!@#$%^&*\-_]{8,30}$/;

function BaseInputEl(
  props: React.InputHTMLAttributes<HTMLInputElement>,
  ref: React.Ref<HTMLInputElement>,
) {
  const {
    minLength = 5, // force formatting
    pattern = null,
    required = true,
    size = 40,
    ...nativeProps
  } = props;

  const patternProp = (function () {
    if (pattern) {
      return pattern;
    } else if (nativeProps.type === 'text' && nativeProps.name === 'username') {
      return usernamePattern.toString();
    } else if (nativeProps.type === 'password') {
      return passwordPattern.toString();
    }

    return;
  })();

  return (
    <input
      {...nativeProps} // force formatting
      minLength={minLength}
      pattern={patternProp}
      required={required}
      size={size}
      ref={ref}
    />
  );
}

/**
 *
 * @param props
 * @param props.minLength Default: `5`
 * @param props.pattern Default: `undefined`, excluding following cases:
 * @example
 * ```js
 * // `type="text"` and `name="username"`
 * /^[a-zA-Z0-9_]{5,24}$/
 * // `type="password"` and `name="password"`
 * /^[A-Za-z0-9!@#$%^&*\-_]{8,30}$/
 * ```
 * @param props.required Default: `true`
 * @param props.size Default: `40`
 * @param ref
 */
export const BaseInput = React.forwardRef(BaseInputEl);
