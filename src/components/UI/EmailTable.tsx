import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import useEmailStore from '@store/useEmailStore';

function EmailTable() {
  const rowsPerPage = 5;

  const { fetchEmails, totalCount, emails, page, setPage } = useEmailStore(
    (state) => state,
  );

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalCount) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  useEffect(() => {
    fetchEmails().catch();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Subject</TableCell>
            <TableCell>Recipient</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? emails.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : emails
          ).map((email) => (
            <TableRow key={email.id}>
              <TableCell component="th" scope="row">
                {email.id}
              </TableCell>
              <TableCell style={{ width: 360 }}>{email.subject}</TableCell>
              <TableCell style={{ width: 260 }}>{email.recipient}</TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[rowsPerPage]}
              colSpan={3}
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default EmailTable;
