class AddColAndRowView {
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
    console.log(this.view.currentColLocation);
    // if(this.view.currentColLocation) {
    //   for (var i = 0; i < this.model.data.length; i++) {
    //     if (this.model.data[i][0] > this.view.currentColLocation) {
    //       this.model.data[i][0] += 1;
    //     }
    //   }
    // }
    this.model.numCols += 1;
    this.view.renderTable();

  }
  addRow(event){
    event.preventDefault();
    console.log(this.view.currentCellLocation);
    console.log(this.model.data);
    console.log(this.model.data);
    for (var i = 0; i < this.model.data.length; i++) {
      if (this.model.data[i][0] == this.model.numRows) {
          this.model.data[i][0] += 1;
        }
    }
    this.model.numRows += 1;
    this.view.renderTable();
  }
}

module.exports = AddColAndRowView;