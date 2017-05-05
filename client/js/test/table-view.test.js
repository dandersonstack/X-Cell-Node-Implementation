const fs = require('fs');
const TableModel = require ('../table-model');
const TableView = require('../table-view');

describe('table-view', () => {
  beforeEach(() => {
    const fixturePath = './client/js/test/fixtures/sheet-container.html';
    const html = fs.readFileSync(fixturePath, 'utf8');
    document.documentElement.innerHTML = html;
  });

  describe('SumRow', () => {
    it('populates the sum row when one value is set', () => {
      //set up the inital state
      const model = new TableModel(3,3);
      const view = new TableView(model);
      view.init();

      //inspect the inital state
      let trs = document.querySelectorAll('TBODY TR');
      let td = trs[3].cells[1];
      expect(td.textContent).toBe('');

      //simulate user action
      document.querySelector('#formula-bar').value = '65';
      view.handleFormulaBarChange();

      //inspect the resulting state
      trs = document.querySelectorAll('TBODY TR');
      expect(trs[3].cells[1].textContent).toBe('65');
    });

    it('calculates the sum correctly when multiple values are set', () => {
      //set up the inital state
      const model = new TableModel(3,3);
      const view = new TableView(model);
      view.init();

      //inspect the inital state
      let trs = document.querySelectorAll('TBODY TR');
      let td = trs[3].cells[0];
      expect(td.textContent).toBe('');

      //simulate user action
      model.setValue({col: 0, row: 1}, '6');
      model.setValue({col: 0, row: 2}, '5');
      view.renderTable();

      //inspect the resulting state
      trs = document.querySelectorAll('TBODY TR');
      expect(trs[3].cells[0].textContent).toBe('11');
    });

    it('ignores random non Integer Values', () => {
      //set up the inital state
      const model = new TableModel(3,3);
      const view = new TableView(model);
      view.init();

      //inspect the inital state
      let trs = document.querySelectorAll('TBODY TR');
      let td = trs[3].cells[0];
      expect(td.textContent).toBe('');

      //simulate user action
      model.setValue({col: 0, row: 1}, 'book');
      view.renderTable();

      //inspect the resulting state
      trs = document.querySelectorAll('TBODY TR');
      expect(trs[3].cells[0].textContent).toBe('');
    });

    it('checks that the elements in the sum row can not be selected', () => {
      //set up the inital state
      const model = new TableModel(3,3);
      const view = new TableView(model);
      view.init()

      //inspect the initial state
      let trs = document.querySelectorAll('TBODY TR');
      let td = trs[3].cells[0];
      expect(td.className).toBe('sum-cell');

      //simulate user action
      td.click();

      //inspect the resulting state
      trs = document.querySelectorAll('TBODY TR');
      td = trs[3].cells[0];
      expect(td.className).toBe('sum-cell');
    });
  });

  describe('formula bar', () => {
    it('makes changes to the value of the current cell', () => {
      //set up the inital state
      const model = new TableModel(3,3);
      const view = new TableView(model);
      view.init();

      //inspect the initial state
      let trs = document.querySelectorAll('TBODY TR');
      let td = trs[1].cells[1];
      expect(td.textContent).toBe('');


      //simulate user action
      td.click();
      document.querySelector('#formula-bar').value = '65';

      view.handleFormulaBarChange();

      //inspect the resulting state
      trs = document.querySelectorAll('TBODY TR');
      expect(trs[1].cells[1].textContent).toBe('65');
    });

    it('updates the value of the current cell', () => {
      //set up the inital state
      const model = new TableModel(10,5);
      const view = new TableView(model);
      model.setValue({col: 2, row: 1}, '123');
      view.init();

      //inspect the initial state
      const fomulaBarEl = document.querySelector('#formula-bar');
      expect(fomulaBarEl.value).toBe('');

      //simulate user action
      const trs = document.querySelectorAll('TBODY TR');
      trs[1].cells[2].click();
      //inspect the resulting state
      expect(fomulaBarEl.value).toBe('123');
    });
  });

  describe('table body', () => {
    it('highlights the current cell when clicked', () => {
      //set up the inital state
      const model = new TableModel(10,5);
      const view = new TableView(model);
      view.init()

      //inspect the initial state
      let trs = document.querySelectorAll('TBODY TR');
      let td = trs[2].cells[3];
      expect(td.className).toBe('');

      //simulate user action
      td.click();

      //inspect the resulting state
      trs = document.querySelectorAll('TBODY TR');
      td = trs[2].cells[3];
      expect(td.className).not.toBe('');
    });

    it('has the right size', () => {
      //set up the inital state
      const numCols = 6;
      const numRows = 10;
      const model = new TableModel(numCols, numRows);
      const view = new TableView(model);
      view.init();

      //inspect the initial state
      let trs = document.querySelectorAll('THEAD TH');
      expect(trs.length).toBe(numCols);
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

  describe('table-header', () => {
    it('has valid column header labels', () => {
      //set up initial state
      const numCols = 6;
      const numRows = 10;
      const model = new TableModel(numCols, numRows);
      const view = new TableView(model);
      view.init()

      //inspect the inital state
      let ths = document.querySelectorAll('THEAD TH');
      expect(ths.length).toBe(numCols);

      let labelTexts = Array.from(ths).map(el => el.textContent);
      expect(labelTexts).toEqual(['A','B','C','D','E','F']);
    });
  });

});
