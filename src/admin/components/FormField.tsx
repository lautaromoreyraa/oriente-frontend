import React from 'react';

interface Props {
  label: string;
  as?: 'input' | 'textarea';
  hint?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement> | React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

export function FormField({ label, as = 'input', hint, inputProps }: Props) {
  const Input = as === 'textarea' ? 'textarea' : 'input';
  const classes = ['form-field__input'];
  if (as === 'textarea') classes.push('form-field__input--textarea');

  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={inputProps.id as string}>
        {label}
      </label>
      {hint && <small className="form-field__hint">{hint}</small>}
      <Input className={classes.join(' ')} {...(inputProps as any)} />
    </div>
  );
}
