/**
 * React Table
 */
/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import {
  SortingState,
  EditingState,
  PagingState,
  IntegratedPaging,
  IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
  PagingPanel,
  DragDropProvider,
  TableColumnReordering,
} from '@devexpress/dx-react-grid-material-ui';
import {
  TableCell,
  Button,
  IconButton,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
} from 'material-ui';
import { withStyles } from 'material-ui/styles';

// demo data
import { generateRows, globalSalesValues } from './demo-data/data';

// page title bar
import PageTitleBar from '../../../components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from '../../../components/RctCollapsibleCard/RctCollapsibleCard';

// intl messages
import IntlMessages from '../../../util/IntlMessages';

const styles = theme => ({
  lookupEditCell: {
    verticalAlign: 'top',
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 1.25,
    paddingLeft: theme.spacing.unit,
  },
});

const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button className="btn-primary text-white" onClick={onExecute} title="Create new row">
      New
    </Button>
  </div>
);
AddButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
};

const EditButton = ({ onExecute }) => (
  <IconButton className="text-dark" onClick={onExecute} title="Edit row">
    <i className="zmdi zmdi-edit"></i>
  </IconButton>
);
EditButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
};

const DeleteButton = ({ onExecute }) => (
  <IconButton className="text-danger" onClick={onExecute} title="Delete row">
    <i className="zmdi zmdi-delete"></i>
  </IconButton>
);
DeleteButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
};

const CommitButton = ({ onExecute }) => (
  <IconButton className="text-success" onClick={onExecute} title="Save changes">
    <i className="zmdi zmdi-floppy"></i>
  </IconButton>
);
CommitButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
};

const CancelButton = ({ onExecute }) => (
  <IconButton className="text-danger" onClick={onExecute} title="Cancel changes">
    <i className="zmdi zmdi-close-circle"></i>
  </IconButton>
);
CancelButton.propTypes = {
  onExecute: PropTypes.func.isRequired,
};

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return (
    <CommandButton
      onExecute={onExecute}
    />
  );
};
Command.propTypes = {
  id: PropTypes.string.isRequired,
  onExecute: PropTypes.func.isRequired,
};

const availableValues = {
  product: globalSalesValues.product,
  region: globalSalesValues.region,
  customer: globalSalesValues.customer,
};

const LookupEditCellBase = ({
  availableColumnValues, value, onValueChange, classes,
}) => (
    <TableCell className={classes.lookupEditCell} >
      <Select value={value} onChange={event => onValueChange(event.target.value)}
        input={<Input />} >
        {availableColumnValues.map(item => (
          <MenuItem key={item} value={item}>{item}</MenuItem>
        ))}
      </Select>
    </TableCell>
  );
LookupEditCellBase.propTypes = {
  availableColumnValues: PropTypes.array.isRequired,
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
LookupEditCellBase.defaultProps = {
  value: undefined,
};
export const LookupEditCell = withStyles(styles, { name: 'ControlledModeDemo' })(LookupEditCellBase);

const Cell = (props) => {
  return <Table.Cell {...props} />;
};
Cell.propTypes = {
  column: PropTypes.shape({ name: PropTypes.string }).isRequired,
};

const EditCell = (props) => {
  const availableColumnValues = availableValues[props.column.name];
  if (availableColumnValues) {
    return <LookupEditCell {...props} availableColumnValues={availableColumnValues} />;
  }
  return <TableEditRow.Cell {...props} />;
};
EditCell.propTypes = {
  column: PropTypes.shape({ name: PropTypes.string }).isRequired,
};

const getRowId = row => row.id;

class ReduxTables extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'region', title: 'Region' },
        { name: 'amount', title: 'Sale Amount' },
        { name: 'discount', title: 'Discount' },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'customer', title: 'Customer' },
      ],
      tableColumnExtensions: [
        { columnName: 'amount', align: 'right' },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...globalSalesValues },
        length: 12,
      }),
      sorting: [],
      editingRowIds: [],
      addedRows: [],
      rowChanges: {},
      currentPage: 0,
      deletingRows: [],
      pageSize: 0,
      pageSizes: [5, 10, 0],
      columnOrder: ['product', 'region', 'amount', 'discount', 'saleDate', 'customer'],
    };

    this.changeSorting = sorting => this.setState({ sorting });
    this.changeEditingRowIds = editingRowIds => this.setState({ editingRowIds });
    this.changeAddedRows = addedRows => this.setState({
      addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
        amount: 0,
        discount: 0,
        saleDate: new Date().toISOString().split('T')[0],
        product: availableValues.product[0],
        region: availableValues.region[0],
        customer: availableValues.customer[0],
      })),
    });
    this.changeRowChanges = rowChanges => this.setState({ rowChanges });
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
    this.commitChanges = ({ added, changed, deleted }) => {
      let { rows } = this.state;
      if (added) {
        const startingAddedId = (rows.length - 1) > 0 ? rows[rows.length - 1].id + 1 : 0;
        rows = [
          ...rows,
          ...added.map((row, index) => ({
            id: startingAddedId + index,
            ...row,
          })),
        ];
      }
      if (changed) {
        rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
      }
      this.setState({ rows, deletingRows: deleted || this.state.deletingRows });
    };
    this.cancelDelete = () => this.setState({ deletingRows: [] });
    this.deleteRows = () => {
      const rows = this.state.rows.slice();
      this.state.deletingRows.forEach((rowId) => {
        const index = rows.findIndex(row => row.id === rowId);
        if (index > -1) {
          rows.splice(index, 1);
        }
      });
      this.setState({ rows, deletingRows: [] });
    };
    this.changeColumnOrder = (order) => {
      this.setState({ columnOrder: order });
    };
  }
  render() {
    const {
      rows,
      columns,
      tableColumnExtensions,
      sorting,
      editingRowIds,
      addedRows,
      rowChanges,
      currentPage,
      deletingRows,
      pageSize,
      pageSizes,
      columnOrder,
    } = this.state;

    return (
      <div className="redux-table-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.reactTable" />} match={this.props.match} />
        <div className="alert alert-info mb-30">
          <p className="m-0">This table demonstrates the Grid’s functionality in the Controlled State mode.
            In the controlled state mode, the whole Grid functionality or its part is controlled externally.
            In the first case, the Grid works as a stateless component. Use the Controlled State mode when you
            need to share the Grid’s state between other application parts. It also allows you to persist the
            Grid’s state and restore it when required.</p>
          <p className="m-0">It you want to see more example redarding redux table then
            <a className="btn-danger btn-sm text-white mx-10" href="https://devexpress.github.io/devextreme-reactive/react/grid/demos/featured/controlled-mode/"> Click here </a>.</p>
        </div>
        <RctCollapsibleCard heading="React Grid Controlled State Mode" fullBlock>
          <Grid rows={rows} columns={columns} getRowId={getRowId} >
            <SortingState sorting={sorting} onSortingChange={this.changeSorting} />
            <PagingState currentPage={currentPage} onCurrentPageChange={this.changeCurrentPage} pageSize={pageSize} onPageSizeChange={this.changePageSize} />
            <IntegratedSorting />
            <IntegratedPaging />
            <EditingState editingRowIds={editingRowIds}
              onEditingRowIdsChange={this.changeEditingRowIds}
              rowChanges={rowChanges}
              onRowChangesChange={this.changeRowChanges}
              addedRows={addedRows}
              onAddedRowsChange={this.changeAddedRows}
              onCommitChanges={this.commitChanges}
            />
            <DragDropProvider />
            <Table columnExtensions={tableColumnExtensions} cellComponent={Cell} />
            <TableColumnReordering order={columnOrder} onOrderChange={this.changeColumnOrder} />
            <TableHeaderRow showSortingControls />
            <TableEditRow cellComponent={EditCell} />
            <TableEditColumn showAddCommand={!addedRows.length} showEditCommand showDeleteCommand commandComponent={Command} />
            <PagingPanel pageSizes={pageSizes} />
          </Grid>
          <Dialog
            open={!!deletingRows.length}
            onClose={this.cancelDelete} >
            <DialogTitle>Delete Row</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure to delete the following row?
                  </DialogContentText>
              <div className="pt-10">
                <Grid rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)} columns={columns} >
                  <Table columnExtensions={tableColumnExtensions} cellComponent={Cell} />
                  <TableHeaderRow />
                </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.cancelDelete} raised="true" className="btn-primary text-white">Cancel</Button>
              <Button onClick={this.deleteRows} raised="true" className="btn-danger text-white">Delete</Button>
            </DialogActions>
          </Dialog>
        </RctCollapsibleCard>
      </div>
    );
  }
}

ReduxTables.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { name: 'ControlledModeDemo' })(ReduxTables);
