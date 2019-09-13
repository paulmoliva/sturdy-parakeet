import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter, numberFilter } from 'react-bootstrap-table2-filter';
import '../../node_modules/react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

const columns = [
  { dataField: 'name', text: 'Name', filter: textFilter(), sort: true },
  {
    dataField: 'vendor_name',
    text: 'Vendor',
    filter: textFilter()
  },
  {
    dataField: 'price',
    text: 'Product Price',
    filter: textFilter(),
    sort: true
  },
  {
    dataField: 'stock',
    text: 'Available',
    filter: textFilter()
  },
  {
    dataField: 'action',
    text: 'Action',
    filter: textFilter()
  },
];

export default class Catalog extends React.Component {
  render() {
    return <BootstrapTable keyField='id' data={ this.props.products } columns={ columns } filter={ filterFactory() } />
  }
}

