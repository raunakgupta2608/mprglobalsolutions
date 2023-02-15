import React from "react";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import Loader from "./Loader";
import { visuallyHidden } from "@mui/utils";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../redux/actions";
import { setSelectedUser } from "../redux/userSelected/selectedUserActions";

const useStyle = makeStyles({
  tableHead: {
    position: "sticky",
    top: 0,
    backgroundColor: "#282c34",
    zIndex: 100,
    whiteSpace: "nowrap",
    "& .MuiTableRow-root": {
      backgroundColor: "#282c34",
      textTransform: "uppercase",
      height: "70px !important",
    },
    "& .MuiTableSortLabel-root": {
      flexDirection: "row-reverse",
      paddingBottom: "4px",
    },
    "& .MuiTableSortLabel-root:hover": {
      color: "white",
    },
    "& .MuiTableCell-root": {
      color: "white",
      padding: "7px 10px 7px 16px",
      "& .Mui-active": {
        color: "white",
        backgroundColor: "#282c34",
        paddingBottom: "4px",
      },
    },
  },
  tableRow: {
    "&:nth-of-type(even)": {
      backgroundColor: "#282c34",
      "& .MuiTableCell-root": {
        color: "white",
      },
    },
    "& .MuiTableCell-root": {
      fontWeight: 400,
      paddingTop: "6px",
      paddingBottom: "6px",
      height: "46px !important",
      cursor: "pointer",
    },
  },
});

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "avatar",
    numeric: true,
    label: "Avatar",
  },
  {
    id: "name",
    numeric: true,
    label: "Name",
  },
  {
    id: "email",
    numeric: true,
    label: "Email",
  },
  {
    id: "contact",
    numeric: true,
    label: "Contact",
  },
];

function SortingTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const classes = useStyle();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead className={classes.tableHead}>
      <TableRow className={classes.tableRow}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            align="center"
          >
            {headCell.label}
            {["name"].includes(headCell.id) && (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

SortingTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

function SortingTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const classes = useStyle();
  const dispatch = useDispatch();
  const { loading: loadingUser, users } = useSelector((state) => state.user);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  React.useEffect(() => {
    setOpen(loadingUser);
  }, [loadingUser]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rowSelected = (value) => {
    dispatch(setSelectedUser(value));
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  return (
    <>
      <Loader open={open} />
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <SortingTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(users, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const labelId = `sorting-table${index}`;

                    return (
                      <TableRow
                        tabIndex={-1}
                        key={row.name}
                        className={classes.tableRow}
                        onClick={(e) => rowSelected(row)}
                      >
                        <TableCell
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          {
                            <Avatar
                              alt={row.name}
                              src={row.avatar}
                              style={{ margin: "auto" }}
                            />
                          }
                        </TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.contact}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                    className={classes.tableRow}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  );
}

export default SortingTable;
