import { emailRegexp } from '@shared/regexp';
import { TextField } from '@mui/material';
import { useState } from 'react';

interface EmailInputProps {
  set: (string: string) => void;
  label?: string;
  size?: 'small' | 'medium';
  noError?: boolean;
}

function EmailInput({ set, label, size, noError }: EmailInputProps) {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<boolean>(false);

  return (
    <TextField
      required
      label={label}
      size={size}
      variant="outlined"
      margin="dense"
      value={email}
      type="email"
      onChange={(e) => setEmail(e.target.value)}
      onBlur={() => {
        if (!noError) setEmailError(!email.match(emailRegexp));
        set(email);
      }}
      error={emailError}
      helperText={emailError && 'Invalid email format.'}
      fullWidth
    />
  );
}

EmailInput.defaultProps = {
  label: 'Email',
  size: 'medium',
  noError: false,
};

export default EmailInput;
