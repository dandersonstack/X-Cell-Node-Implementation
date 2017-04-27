const TableModel = require('../table-model.js');

describe('table-model', () => {
	it('can set then get a value', () => {
		//set the inital state
		const model = new TableModel();
		const location = {row: 3, col: 5};
		//inspect the initial state
		expect(model.getValue(location)).toBeUndefined();
		//set the value to create a new state
		const value = 10
		model.setValue(location, value);
		//inspect the resulting state
		expect(model.getValue(location)).toBe(10);

	});
});