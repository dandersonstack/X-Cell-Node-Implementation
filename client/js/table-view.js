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
		this.currentCellLocation = {col: 0, row: 0};
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

	isCurrentCell(col,row) {
		return this.currentCellLocation.col == col &&
					 this.currentCellLocation.row == row
	}

	renderTableBody(){
		const fragment = document.createDocumentFragment();
		for (let row = 0; row < this.model.numRows; row++) {
			const tr = createTR();
			for(let col = 0; col < this.model.numCols; col++) {
				const position = {col: col, row: row};
				const value = this.model.getValue(position);
				const td = createTD(value);
				tr.appendChild(td);

				if(this.isCurrentCell(col, row)) {
					td.className = 'current-cell';
				}
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
			const td = createTD(total);
			td.className = 'sum-cell';
			tr.appendChild(td);
		}
		this.sheetBodyEl.appendChild(tr);
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
	}


	handleSheetClick(evt){
		const col = evt.target.cellIndex;
		const row = evt.target.parentElement.rowIndex - 1;
		this.currentCellLocation = {col: col, row: row};
		this.renderTableBody();
		this.renderFomulaBar();
	}
}

module.exports = TableView;