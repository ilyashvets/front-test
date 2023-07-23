import { useState } from 'react';
import useAuthStore from '@store/useAuthStore';
import {
  Paper,
  Container,
  Grid,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import EmailTable from '@UI/EmailTable';
import CreateEmailDialog from '@component/CreateEmailDialog';

function Main() {
  const { user } = useAuthStore((state) => state);

  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <>
      <CreateEmailDialog open={isOpen} setOpen={setOpen} />
      <Container maxWidth="lg" sx={{ marginTop: '24px' }}>
        <Grid container alignItems="center" spacing={4}>
          <Grid item xs={2} />
          <Grid item xs={3}>
            <Paper>
              <ListItem>
                <ListItemText primary={user.username} secondary={user.email} />
              </ListItem>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={() => setOpen(true)}>
              Create mail
            </Button>
          </Grid>
        </Grid>

        <Grid container sx={{ marginTop: '32px' }}>
          <Grid item xs={2} />
          <Grid item xs={8}>
            <EmailTable />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Main;
