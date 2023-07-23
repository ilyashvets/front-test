import { FormEvent, useState } from 'react';
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import useAuthStore from '@store/useAuthStore';
import Editor from '@UI/Editor';
import SenderInput from '@UI/SenderInput';
import EmailInput from '@UI/EmailInput';
import TextInput from '@UI/TextInput';
import useEmailStore from '@store/useEmailStore';

function CreateEmailDialog({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (state: boolean) => void;
}) {
  const { user } = useAuthStore((state) => state);
  const { fetchSendEmail } = useEmailStore((state) => state);

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [mailObject, setMailObject] = useState<
    Omit<SendEmail.Request, 'message'>
  >({
    sender: user.id,
    recipient: '',
    subject: '',
  });
  const [message, setMessage] = useState<string>('');

  const handleSet = (key: string) => (value: string) =>
    setMailObject({
      ...mailObject,
      [key]: value,
    });

  const handleClose = () => {
    setOpen(false);
    setMessage('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    fetchSendEmail({
      ...mailObject,
      message,
    })
      .then((res) => setSuccess(`Email has been sent to ${res.recipient}`))
      .catch(() => setError('Something was happened'))
      .finally(() =>
        setTimeout(() => {
          setSuccess(null);
          setError(null);
        }, 3000),
      );

    setOpen(false);
    setMessage('');
  };

  return (
    <>
      {(success || error) && (
        <Alert
          sx={{
            position: 'fixed',
            transform: 'translateY(8px)',
            right: '8px',
          }}
          variant="outlined"
          severity={error ? 'error' : 'success'}>
          {success || error}
        </Alert>
      )}
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create new email</DialogTitle>
          <DialogContent>
            <SenderInput sender={user.email} />
            <EmailInput
              set={handleSet('recipient')}
              label="Recipient"
              size="small"
              noError
            />
            <TextInput set={handleSet('subject')} label="Subject" />
            <Editor value={message} setValue={setMessage} />
          </DialogContent>
          <DialogActions>
            <Button type="reset" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit">Send</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default CreateEmailDialog;
