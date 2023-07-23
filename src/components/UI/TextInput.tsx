import { TextField } from '@mui/material';
import { useState } from 'react';

function TextInput({
  set,
  label,
}: {
  set: (string: string) => void;
  label: string;
}) {
  const [value, setValue] = useState<string>('');

  return (
    <TextField
      sx={{ marginTop: '8px' }}
      label={label}
      onChange={(e) => setValue(e.target.value)}
      onBlur={() => set(value)}
      size="small"
      required
      fullWidth
    />
  );
}

export default TextInput;
