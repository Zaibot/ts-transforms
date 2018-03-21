import { addNamedExport, applyTransformations } from '.';

const normalize = (text: string) => text.replace(/[\r]/g, ' ').trim();

describe('addNamedExport', () => {
    it('adds', () => {
        const transform = applyTransformations([
            addNamedExport('test', 'one')
        ]);
        const input = ``;
        const output = `export {one} from "test";`;
        const result = transform(input);

        expect(normalize(result)).toBe(normalize(output));
    });

    it('skips when present', () => {
        const transform = applyTransformations([
            addNamedExport('test', 'one')
        ]);
        const input = `export {one} from "test";`;
        const output = `export {one} from "test";`;
        const result = transform(input);

        expect(normalize(result)).toBe(normalize(output));
    });

    it('adds to existing', () => {
        const transform = applyTransformations([
            addNamedExport('test', 'two')
        ]);
        const input = `export {one} from "test";`;
        const output = `export {one, two} from "test";`;
        const result = transform(input);

        expect(normalize(result)).toBe(normalize(output));
    });
});
