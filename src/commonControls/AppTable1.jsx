import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import API from "../../utils/axios";
import { Grid, Stack, Tooltip } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppTableHead from "./AppTableHead";

const useStyle = makeStyles((theme) => ({
  tableRow: {
    "&:nth-of-type(even)": { backgroundColor: theme.palette.color.greyS1 },
    "& .MuiTableCell-root": {
      color: `${theme.palette.color.greyS4} !important`,
      ...theme.typography.body2,
      fontWeight: 400,
      paddingTop: "6px",
      paddingBottom: "6px",
      height: "46px !important",
      cursor: "pointer",
    },
  },
  clickable: {
    cursor: "pointer",
    textDecoration: "underline",
  },
  tableHead: {
    position: "sticky",
    top: 0,
    backgroundColor: theme.palette.color.greyS2,
    whiteSpace: "nowrap",
    "& .MuiTableRow-root": {
      backgroundColor: theme.palette.color.greyS2,
      textTransform: "uppercase",
      height: "70px !important",
    },
    "& .MuiTableSortLabel-root": {
      flexDirection: "row-reverse",
      paddingBottom: "4px",
    },
    "& .MuiTableCell-root": {
      backgroundColor: theme.palette.color.greyS2,
      padding: "7px 10px 7px 16px",
      "& .Mui-active": {
        color: `${theme.palette.color.greyS4} !important`,
        backgroundColor: theme.palette.color.greyS2,
        paddingBottom: "4px",
      },
      ...theme.typography.body3,
    },
  },
  tableCellC1Width: {
    width: "200px",
  },
  titleTypography: {
    color: "black !important",
    ...theme.typography.fontTitillium,
    lineHeight: "30px !important",
    fontSize: "16px !important",
    fontWeight: "600 !important",
  },
  errMsg: {
    color: theme.palette.color.red,
    fontSize: "16px",
    lineHeight: "24px",
    fontWeight: 600,
    marginInlineStart: "calc(100% - 66%)",
    fontFamily: "'Open Sans',sans-serif ",
  },
  lockIcon: {
    height: "16px",
    margin: "4px 2px 0px 0px",
  },
  popover: {
    boxShadow: "none",
    border: "1px solid #ffffff",
    padding: "4px",
    background: "#6C6C6C",
    opacity: 0.2,
  },
}));

export function AppTable() {
  const classes = useStyle();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [order, setOrder] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [token, setToken] = useState("");
  const [rows, setRows] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [applyError, setApplyError] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState(false);

  const handleRequestSort = (columnId, order) => {
    setDataLoading(true);
    setOrder(order);
    setOrderBy(columnId);
    setRows([]);
    setToken("");
  };

  const fetchAvailableCapacity = (customToken = token) => {
    setDataLoading(true);
    API.post(`/1/available-capacity/page/records`, {
      pageSize: 10,
      continuationToken: btoa(customToken),
      columnName: orderBy,
      order: order,
    })
      .then((resp) => {
        if (API.get(resp, "data.value.availableCapacity", []).length > 0) {
          const _rows = [...rows, ...resp.data.value.availableCapacity];
          setRows(_rows);
          setToken(resp.data.value.continuationToken);
          setApplyError("");
        } else {
          setToken("");
          setApplyError("");
        }
        if (
          API.get(resp, "data.value.availableCapacity", []).length <= 0 &&
          !token
        ) {
          setApplyError("No data available");
        }
        setIsDownloading(false);
        setDataLoading(false);
      })
      .catch((error) => {
        console.log("availableCapacity error", error);
        if (error?.response?.status === 400) {
          const errors = Object.values(
            JSON.parse(error.response.data.value.value.responseMessage)
          ).map((key) => key[0]);
          const errorString = errors.join();
          setToastMessage(errorString);
        } else {
          setToastMessage(
            "Something went wrong at server. Please contact administrator"
          );
        }
        setDataLoading(false);
        setToastType(false);
      });
  };

  useEffect(() => {
    fetchAvailableCapacity();
  }, []);

  useEffect(() => {
    if (order.length > 0 || orderBy.length > 0) fetchAvailableCapacity(token);
  }, [order, orderBy]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%" }}>
          <TableContainer
            className="table-container"
            style={{ maxHeight: "calc(100vh - 155px)" }}
          >
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
                      <Tooltip followCursor placement="top">
                        <TableRow
                          classes={{ root: classes.tableRow }}
                          key={row.id}
                          hover
                          rowheight={25}
                          role="checkbox"
                          tabIndex={-1}
                        >
                          <TableCell align="left">{""}</TableCell>
                          <TableCell align="left">{""}</TableCell>
                          <TableCell align="left">{""}</TableCell>
                        </TableRow>
                      </Tooltip>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {applyError && (
            <Grid sx={{ minHeight: 50 }} container>
              <p className={classes.errMsg}>{applyError}</p>
            </Grid>
          )}
        </Paper>
      </Box>
    </>
  );
}

export default AppTable;
