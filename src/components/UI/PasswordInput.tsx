import { TextField, Tooltip } from '@mui/material';
import { passwordRegexp } from '@shared/regexp';
import { useState } from 'react';

function PasswordTooltip() {
  return (
    <ul style={{ paddingLeft: '14px', margin: 0 }}>
      <li>Minimum 8 characters</li>
      <li>At least 1 uppercase letter</li>
      <li>At least 1 lowercase letter</li>
      <li>At least 1 digit</li>
      <li>At least 1 symbol (e.g., ! @ # $ % ^ & *)&quot;</li>
    </ul>
  );
}

function PasswordInput({
  confirm,
  set,
}: {
  confirm?: boolean;
  set: (string: string) => void;
}) {
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [passwordConfirmError, setPasswordConfirmError] =
    useState<boolean>(false);

  return (
    <>
      <Tooltip title={confirm && <PasswordTooltip />} placement="right">
        <TextField
          required
          label="Password"
          variant="outlined"
          type="password"
          margin="dense"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => {
            if (confirm) {
              setPasswordError(!password.match(passwordRegexp));
              setPasswordConfirmError(password !== passwordConfirm);
            }
            set(password);
          }}
          error={passwordError}
          helperText={
            passwordError && 'The password does not meet the requirements.'
          }
          fullWidth
        />
      </Tooltip>
      {confirm && (
        <TextField
          required
          label="Confirm password"
          variant="outlined"
          type="password"
          margin="dense"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          onBlur={() => {
            setPasswordConfirmError(password !== passwordConfirm);
          }}
          error={passwordConfirmError}
          helperText={passwordConfirmError && 'Passwords are different'}
          fullWidth
        />
      )}
    </>
  );
}

PasswordInput.defaultProps = {
  confirm: false,
};

export default PasswordInput;
