import { addWildCardExport, applyTransformations } from '.';
import { expect } from 'chai';

const normalize = (text: string) => text.replace(/[\r]/g, ' ').trim();

describe('addWildCardExport', () => {
    it('adds', () => {
        const transform = applyTransformations([
            addWildCardExport('test')
        ]);
        const input = ``;
        const output = `export * from "test";`;
        const result = transform(input);

        expect(normalize(result)).to.equal(normalize(output));
    });

    it('skips when present', () => {
        const transform = applyTransformations([
            addWildCardExport('test')
        ]);
        const input = `export * from "test";`;
        const output = `export * from "test";`;
        const result = transform(input);

        expect(normalize(result)).to.equal(normalize(output));
    });
});
