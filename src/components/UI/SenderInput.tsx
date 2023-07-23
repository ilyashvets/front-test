import { TextField } from '@mui/material';

function SenderInput({ sender }: { sender: string }) {
  return (
    <TextField
      disabled
      sx={{ marginTop: '8px' }}
      label="Sender"
      defaultValue={sender}
      InputProps={{
        readOnly: true,
      }}
      size="small"
      fullWidth
    />
  );
}

export default SenderInput;
