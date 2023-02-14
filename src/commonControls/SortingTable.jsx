import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import API from "../utils/axios";
import { visuallyHidden } from "@mui/utils";
import { makeStyles } from "@mui/styles";
import { Avatar } from "@mui/material";

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
    id: "id",
    numeric: false,
    label: "id",
  },
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
    id: "Email",
    numeric: true,
    label: "Email",
  },
  {
    id: "contact",
    numeric: true,
    label: "Contact",
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const classes = useStyle();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead classes={{ root: classes.tableHead }}>
      <TableRow classes={{ root: classes.tableRow }}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            align="center"
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [row, setRow] = React.useState([]);
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const classes = useStyle();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = row.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const fetchUserData = async () => {
    try {
      const { data } = await API.get("/users");
      setRow(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    fetchUserData();
  }, []);

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - row.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={row.length}
            />
            <TableBody>
              {stableSort(row, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      onClick={(event) => handleClick(event, row.name)}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      classes={{ root: classes.tableRow }}
                    >
                      <TableCell
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="center"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="center">
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
                  classes={{ root: classes.tableRow }}
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
          count={row.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
