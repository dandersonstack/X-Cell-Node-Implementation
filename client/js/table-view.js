const { getLetterRange } = require('./array-util');
const { removeChildren, createTH, createTR, createTD } = require('./dom-util');

class TableView {
  
  constructor(model) {
    this.model = model;
  }

  init() {
    this.initDomReferences();
    this.initCurrentCell();
    this.renderTable();
    this.attachEventHandlers();
  }

  initDomReferences() {
    this.headerRowEl = document.querySelector('THEAD TR');
    this.sheetBodyEl = document.querySelector('TBODY');
    this.formulaBarEl = document.querySelector('#formula-bar');
  }

  initCurrentCell() {
    this.currentCellLocation = {col: 1, row: 0};
    this.renderFomulaBar();
  }

  normalizeValueForRendering(value) {
    return value || '';
  }

  renderFomulaBar() {
    const currentCellValue = this.model.getValue(this.currentCellLocation);
    this.formulaBarEl.value = this.normalizeValueForRendering(currentCellValue);
    this.formulaBarEl.focus();
  }

  handleFormulaBarChange(evt) {
    const value = this.formulaBarEl.value;
    this.model.setValue(this.currentCellLocation, value);
    this.renderTableBody();
  }

  renderTable() {
    this.renderTableHeader();
    this.renderTableBody();
  }

  renderTableHeader() {
    //clear header row
    removeChildren(this.headerRowEl);
    //get letters and build elements
    getLetterRange('A', this.model.numCols)
      .map(colLabel => createTH(colLabel))
      .forEach(th => this.headerRowEl.appendChild(th));
  }

  isCurrentRow(row) {
    return  this.currentCellLocation.col == 0 &&
           this.currentCellLocation.row == row;
  }

  isCurrentCol(col) {
    return this.currentColLocation == col
  }

  isCurrentCell(col,row) {
    return this.currentCellLocation.col == col &&
           this.currentCellLocation.row == row
  }

  setClassName(col, row, td) {
    if(this.isCurrentCol(col)) {
      td.className = 'current-col';
    } else if (this.isCurrentRow(row)){
      td.className = 'current-row';
    } else if (this.isCurrentCell(col, row)) {
      td.className = 'current-cell';
    }
  }

  generateTDElem(col, row) {
    const position = {col: col, row: row};
    const value = this.model.getValue(position);
    return createTD(value);
  }

  renderTableBody(){
    const fragment = document.createDocumentFragment();
    for (let row = 0; row < this.model.numRows; row++) {
      const tr = createTR();
      //initialize the first column header
      let td = createTD(row.toString());
      tr.appendChild(td);
      for(let col = 1; col < this.model.numCols; col++) {
        td = this.generateTDElem(col, row);
        tr.appendChild(td);
        this.setClassName(col, row, td);
      }
      fragment.appendChild(tr);
    }
    removeChildren(this.sheetBodyEl);
    this.sheetBodyEl.appendChild(fragment);
    this.renderSumRow();
  }

  renderSumRow() {
    const tr = createTR();
    for(let col = 0; col < this.model.numCols; col++) {
      const total = this.calculateColTotal(col);
      let td = createTD(total);
      if(!this.doesColHaveAValue(col)) {
        td = createTD();
      }
      td.className = 'sum-cell';
      //if the total is greater than zero, add that value to model
      if(total > 0) {
        this.model.setValue({col: col, row: this.model.numRows}, total);
      }
      tr.appendChild(td);
    }
    this.sheetBodyEl.appendChild(tr);
  }

  doesColHaveAValue(col) {
    for (let row = 0; row < this.model.numRows; row++) {
      const position = {col: col, row: row};
      if(this.isNumeric(this.model.getValue(position))) {
        return true;
      }
    }
  }

  isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  calculateColTotal(col) {
    let total = 0;
    for(let row = 0; row < this.model.numRows; row++) {
      const position = {col: col, row: row};
      total += this.normalizeValueForSumming(this.model.getValue(position));
    }
    return total;
  }

  normalizeValueForSumming(value) {
    const intVal = parseInt(value);
    return intVal || 0;
  }

  attachEventHandlers() {
    this.sheetBodyEl.addEventListener('click', 
      this.handleSheetClick.bind(this));
    this.formulaBarEl.addEventListener('keyup', this.handleFormulaBarChange.bind(this));
    this.headerRowEl.addEventListener('click',this.handleHeaderClick.bind(this));
  }

  handleHeaderClick(evt) {
    const col = evt.target.cellIndex;
    this.currentCellLocation = {col: -1, row: -1};
    this.currentColLocation = col;
    this.renderTableBody();
    this.renderFomulaBar();
  }

  handleSheetClick(evt){
    const col = evt.target.cellIndex;
    const row = evt.target.parentElement.rowIndex - 1;
    this.currentCellLocation = {col: col, row: row};
    this.currentColLocation = undefined;
    this.renderTableBody();
    this.renderFomulaBar();
  }
}

module.exports = TableView;
