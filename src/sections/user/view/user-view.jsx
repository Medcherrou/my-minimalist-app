import { useState } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users as initialUsers } from 'src/_mock/user';

import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function UserPage() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  
  const [users, setUsers] = useState(initialUsers);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };


  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  

  
  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setSelected([]);
    setUsers(updatedUsers);
  };


  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;





  // State for edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUserData, setEditedUserData] = useState({
    name: '',
    company: '',
    role: '',
    isVerified: '',
    status: '',
  });

  // Handle opening the edit dialog
  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user.id === userId);

    if (userToEdit) {
      setEditingUserId(userId);
      setEditedUserData({
        name: userToEdit.name,
        company: userToEdit.company,
        role: userToEdit.role,
        isVerified: userToEdit.isVerified,
        status: userToEdit.status,
      });
      setEditDialogOpen(true);
    }
  };
  // Handle saving changes in the edit dialog
  const handleSaveEdit = () => {
    // Implement logic to save the edited data
    const updatedUsers = users.map((user) =>
      user.id === editingUserId ? { ...user, ...editedUserData } : user
    );

    setUsers(updatedUsers);
    setEditDialogOpen(false);
  };



  // ...



// ...


  return (
    <Container>    
      <Typography variant="h4" sx={{ mb: 5 }}>
          Users
      </Typography>

      <Card>
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleSort}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'company', label: 'Company' },
                  { id: 'role', label: 'Role' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      id={row.id}
                      name={row.name}
                      role={row.role}
                      status={row.status}
                      company={row.company}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.id) !== -1}
                      handleEdit={() => handleEdit(row.id)}
                      handleDelete={handleDelete}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />


        <Dialog 
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          BackdropProps={{
            style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
          }}
        >
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={editedUserData.name}
            onChange={(e) => setEditedUserData({ ...editedUserData, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Company"
            value={editedUserData.company}
            onChange={(e) => setEditedUserData({ ...editedUserData, company: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            value={editedUserData.role}
            onChange={(e) => setEditedUserData({ ...editedUserData, role: e.target.value })}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      </Card>
    </Container>
  );
}
