const TableModel = require ('./table-model');
const TableView = require('./table-view');
const AddColAndRowView = require('./add-col-and-row-view');

const model = new TableModel();
const tableView = new TableView(model);

tableView.init()

const addColAndRowView = new AddColAndRowView(model, tableView);
addColAndRowView.connectEventHandlers();