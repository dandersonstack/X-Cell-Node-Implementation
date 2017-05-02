class ButtonView {
  constructor(model, tableView) {
    this.model = model;
    this.view = tableView;
  }

  connectEventHandlers() {
    document.getElementById('add-col')
    .addEventListener(
      'click',
      this.addCol.bind(this));
    document.getElementById('add-row')
    .addEventListener(
      'click',
      this.addRow.bind(this));
  }

  addCol(event){
    event.preventDefault();
    this.model.numCols += 1;
    this.view.renderTable();

  }
  addRow(event){
    event.preventDefault();
    this.model.numRows += 1;
    this.view.renderTable();
  }
}

module.exports = ButtonView;