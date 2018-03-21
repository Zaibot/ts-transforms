import { setExportedVariable, applyTransformations } from '.';

const normalize = (text: string) => text.replace(/[\r]/g, ' ').trim();

describe('setExportedVariable', () => {
    it('adds', () => {
        const transform = applyTransformations([
            setExportedVariable('test', 'true')
        ]);
        const input = ``;
        const output = `export const test = true;`;
        const result = transform(input);

        expect(normalize(result)).toBe(normalize(output));
    });

    it('skips when present', () => {
        const transform = applyTransformations([
            setExportedVariable('test', 'true')
        ]);
        const input = `export const test = false;`;
        const output = `export const test = true;`;
        const result = transform(input);

        expect(normalize(result)).toBe(normalize(output));
    });

    it('adds to existing', () => {
        const transform = applyTransformations([
            setExportedVariable('test', 'true')
        ]);
        const input = `export const test = true;`;
        const output = `export const test = true;`;
        const result = transform(input);

        expect(normalize(result)).toBe(normalize(output));
    });
});
