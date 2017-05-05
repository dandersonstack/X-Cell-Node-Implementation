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
    this.model.numCols += 1;
    this.view.renderTable();
  }
  addRow(event){
    event.preventDefault();
    for(var key in this.model.data) {
      if (parseInt(key[2]) === this.model.numRows) {
        delete this.model.data[key];
      }
    }
    for(var key in this.model.data) {
      if (parseInt(key[2]) === this.model.numRows) {
        delete this.model.data[key];
      }
    }
    this.model.numRows += 1;
    console.log(this.view.currentCellLocation['col']);
    //implement incrementing the correct row here
    //this.incrementRow;
    this.view.renderTable();
  }
  incrementRow() {
    //this block will make it so add row will move all the elemnts below the row down
    // if(this.view.currentCellLocation['col'] == 0) {
    //   const row = parseInt(this.view.currentCellLocation['row']);
    //   for(var key in this.model.data) {
    //     if (parseInt(key[2]) > row) {
    //       //this.model.data[key][2] = parseInt(this.model.data[key][2]) + 1;
    //     }
    //   }
    // }
  }
}

module.exports = AddColAndRowView;
