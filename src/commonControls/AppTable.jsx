import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AppTableHead from "./AppTableHead";
import AppPagination from "./AppPagination";
import API from "../utils/axios";

const useStyle = makeStyles({
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

export function AppTable() {
  const classes = useStyle();
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dataLoading, setDataLoading] = useState(false);

  const handleRequestSort = (columnId, order) => {
    setDataLoading(true);
    setOrder(order);
    setOrderBy(columnId);
    setRows([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchUserData = async () => {
    setDataLoading(true);
    try {
      const { data } = await API.get("/users");
      setRows(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (order.length > 0 || orderBy.length > 0) fetchUserData();
  }, [order, orderBy]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%" }}>
          <TableContainer style={{ maxHeight: "calc(100vh - 155px)" }}>
            <Table sx={{ minWidth: "100%" }} data-testid="table">
              <AppTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <>
                      <TableRow
                        classes={{ root: classes.tableRow }}
                        key={row.id}
                      >
                        <TableCell align="left">{row.id}</TableCell>
                        <TableCell align="left">
                          {<Avatar alt={row.name} src={row.avatar} />}
                        </TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.contact}</TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={3}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={AppPagination}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}

export default AppTable;
