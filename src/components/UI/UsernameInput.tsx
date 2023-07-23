import { TextField, Tooltip } from '@mui/material';
import { loginRegexp } from '@shared/regexp';
import { useState } from 'react';

function UsernameInput({
  withError,
  set,
}: {
  withError?: boolean;
  set: (string: string) => void;
}) {
  const [username, setUsername] = useState<string>('');
  const [usernameError, setUsernameError] = useState<boolean>(false);

  return (
    <Tooltip
      title={withError && 'Username must only contain letters, digits, _.'}
      placement="right">
      <TextField
        required
        label="Username"
        variant="outlined"
        margin="dense"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onBlur={() => {
          if (withError) setUsernameError(!username.match(loginRegexp));
          set(username);
        }}
        error={usernameError}
        helperText={usernameError && 'Invalid username format.'}
        fullWidth
      />
    </Tooltip>
  );
}

UsernameInput.defaultProps = {
  withError: false,
};
export default UsernameInput;
