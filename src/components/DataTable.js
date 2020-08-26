import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  TableContainer,
  Paper,
  TableSortLabel,
  withStyles,
} from "@material-ui/core";
import usePrevious from "../hooks/usePrevious";

const HeaderCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#1a76d2",
    color: "#ffffff",
  },
}))(TableCell);

export function DataTable(props) {
  const { data, sortAction } = props;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const displayOrder = usePrevious(order);

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <HeaderCell>Symbol</HeaderCell>
            <HeaderCell>Name</HeaderCell>
            <HeaderCell>
              <TableSortLabel
                active={orderBy === "cmc_rank"}
                direction={displayOrder}
                onClick={() => {
                  setOrderBy("cmc_rank");
                  sortAction({ orderBy: "cmc_rank", order });
                  setOrder(order === "asc" ? "desc" : "asc");
                }}
              >
                CMC Rank
              </TableSortLabel>
            </HeaderCell>
            <HeaderCell>
              <TableSortLabel
                active={orderBy === "quote.USD.price"}
                direction={displayOrder}
                onClick={() => {
                  setOrderBy("quote.USD.price");
                  sortAction({ orderBy: "quote.USD.price", order });
                  setOrder(order === "asc" ? "desc" : "asc");
                }}
              >
                Price
              </TableSortLabel>
            </HeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.length ? (
            data.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.symbol}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.cmc_rank}</TableCell>
                <TableCell>
                  {row.quote?.USD?.price.toLocaleString() || "NULL"}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan="4" align="center">
                No Data Available!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

DataTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string,
      name: PropTypes.string,
      cmc_rank: PropTypes.number,
      quote: PropTypes.shape({
        USD: PropTypes.shape({
          price: PropTypes.number,
        }),
      }),
    })
  ),
  sortAction: PropTypes.func,
};
