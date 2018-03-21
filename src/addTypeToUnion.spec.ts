import { addTypeToUnion, applyTransformations } from '.';

const normalize = (text: string) => text.replace(/[\r\n ]+/g, ' ').trim();

describe('addTypeToUnion', () => {
    it('adds', () => {
        const transform = applyTransformations([
            addTypeToUnion('test', '1')
        ]);
        const input = ``;
        const output = `export type test = 1;`;
        const result = transform(input);

        expect(normalize(result)).toBe(normalize(output));
    });

    it('skips when present', () => {
        const transform = applyTransformations([
            addTypeToUnion('test', '1')
        ]);
        const input = `export type test = 1;`;
        const output = `export type test = 1;`;
        const result = transform(input);

        expect(normalize(result)).toBe(normalize(output));
    });

    it('adds to existing', () => {
        const transform = applyTransformations([
            addTypeToUnion('test', '2')
        ]);
        const input = `export type test = 1;`;
        const output = `export type test = 1 & 2;`;
        const result = transform(input);

        expect(normalize(result)).toBe(normalize(output));
    });

    it('adds to existing (3 total)', () => {
        const transform = applyTransformations([
            addTypeToUnion('test', '3')
        ]);
        const input = `export type test = 1 & 2;`;
        const output = `export type test = 1 & 2 & 3;`;
        const result = transform(input);

        expect(normalize(result)).toBe(normalize(output));
    });
});
