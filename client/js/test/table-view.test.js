const fs = require('fs');
const TableModel = require ('../table-model');
const TableView = require('../table-view');

describe('table-view', () => {
	beforeEach(() => {
		const fixturePath = './client/js/test/fixtures/sheet-container.html';
		const html = fs.readFileSync(fixturePath, 'utf8');
		document.documentElement.innerHTML = html;
	});

	describe('table body', () => {
		it('has the right size', () => {
			//set up the inital state
			const numCols = 6;
			const numRows = 10;
			const model = new TableModel(numCols, numRows);
			const view = new TableView(model);
			view.init();

			//inspect the initial state
			let ths = document.querySelectorAll('THEAD TH');
			expect(ths.length).toBe(numCols);
		});

		it('fills in values from the model', () => {
			//set up the inital state
			//inspect the initial state
			const model = new TableModel(3, 3);
			const view = new TableView(model);
			model.setValue({col: 2, row: 1}, '123');
			view.init();

			const trs = document.querySelectorAll('TBODY TR');
			expect(trs[1].cells[2].textContent).toBe('123');

		});
	});
	describe('table header', () => {
		//set up initial state
		const numCols = 6;
		const numRows = 10;
		const model = new TableModel(numCols, numRows);
		const view = new TableView(model);
		view.init();

		//inspect the inital state
		let ths = document.querySelectorAll('THEAD TH');
		expect(ths.length).toBe(numCols);

		let labelTexts = ths.map(el => el.textConten);
		expect(labelTexts).toEqual(['A','B','C','D','E','F']);
	});
});