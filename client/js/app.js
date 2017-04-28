const TableModel = require ('./table-model');
const TableView = require('./table-view');
const ButtonView = require('./button-view');

const model = new TableModel();
const tableView = new TableView(model);

tableView.init()

const buttonView = new ButtonView(model, tableView);
buttonView.connectEventHandlers();