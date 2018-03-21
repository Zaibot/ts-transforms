import { addTypeToUnion, applyTransformations } from '.';

const normalize = (text: string) => text.replace(/[\r\n ]+/g, ' ').trim();

describe('addTypeToUnion', () => {
    it('adds', () => {
        const transform = applyTransformations([
            addTypeToUnion('test', 'one')
        ]);
        const input = ``;
        const output = `export type test = one;`;
        const result = transform(input);

        expect(normalize(result)).toBe(normalize(output));
    });

    it('skips when present', () => {
        const transform = applyTransformations([
            addTypeToUnion('test', 'one')
        ]);
        const input = `export type test = one;`;
        const output = `export type test = one;`;
        const result = transform(input);

        expect(normalize(result)).toBe(normalize(output));
    });
    
    it('adds to existing', () => {
        const transform = applyTransformations([
            addTypeToUnion('test', 'two')
        ]);
        const input = `export type test = one;`;
        const output = `export type test = one & two;`;
        const result = transform(input);

        expect(normalize(result)).toBe(normalize(output));
    });
    
    it('adds to existing (3 total)', () => {
        const transform = applyTransformations([
            addTypeToUnion('test', 'three')
        ]);
        const input = `export type test = one & two;`;
        const output = `export type test = one & two & three;`;
        const result = transform(input);

        expect(normalize(result)).toBe(normalize(output));
    });
});
