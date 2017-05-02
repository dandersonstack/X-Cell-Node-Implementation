const { createTD, createTR, createTH, removeChildren
      } = require('../dom-util');

describe('dom-util', () => {

  describe('DOM creation functions', () => {
    describe('createTH', () => {
      it('produce a vaild TH element', () => {
        const el = createTH();
        expect(el.tagName).toBe('TH');
      });
      it('sets the text of the TH', () => {
        const text = 'Oh that\'s just greate! Well, game over, man!';
        const el = createTH(text);
        expect(el.textContent).toEqual(text);
      });

    });
    describe('createTR', () => {
      it('produce a vaild TR element', () => {
        const el = createTR();
        expect(el.tagName).toBe('TR');
      });
    });
    describe('createTD', () => {
      it('produce a vaild TD element', () => {
        const el = createTD();
        expect(el.tagName).toBe('TD');
      });
    });
  });

  describe('removeChildren()', () => {
    it('removes one child', () => {
      //set up inital state
      const parent = document.createElement('DIV');
      const child = document.createElement('STRONG');
      parent.appendChild(child);

      //inspect initial state
      expect(parent.childNodes.length).toBe(1);

      //execute code under test
      removeChildren(parent);

      //inspect new state
      expect(parent.childNodes.length).toBe(0);
    });
  });
});