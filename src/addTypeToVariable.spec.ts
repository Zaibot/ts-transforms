import { addTypeToVariable, applyTransformations } from '.';
import { expect } from 'chai';

const normalize = (text: string) => text.replace(/[\r\n ]+/g, ' ').trim();

describe('addTypeToVariable', () => {
    it('adds', () => {
        const transform = applyTransformations([
            addTypeToVariable('test', 'one')
        ]);
        const input = ``;
        const output = `export const test: one = 1;`;
        const result = transform(input);

        expect(normalize(result)).to.equal(normalize(output));
    });

    it('skips when present', () => {
        const transform = applyTransformations([
            addTypeToVariable('test', 'one')
        ]);
        const input = `export const test: one = 1;`;
        const output = `export const test: one = 1;`;
        const result = transform(input);

        expect(normalize(result)).to.equal(normalize(output));
    });
    
    it('adds to existing', () => {
        const transform = applyTransformations([
            addTypeToVariable('test', 'two')
        ]);
        const input = `export const test: one = 1;`;
        const output = `export const test: one & two = 1;`;
        const result = transform(input);

        expect(normalize(result)).to.equal(normalize(output));
    });
    
    it('adds to existing (3 total)', () => {
        const transform = applyTransformations([
            addTypeToVariable('test', 'three')
        ]);
        const input = `export const test: one & two = 1;`;
        const output = `export const test: one & two & three = 1;`;
        const result = transform(input);

        expect(normalize(result)).to.equal(normalize(output));
    });
});
