import {sepia} from '../src/js/photoFilters';

describe('photofilter tests', () => {
   test('sepia is a function', () => {
       expect(typeof sepia).toBe('function');
   })
});