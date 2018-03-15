import { addNamedImport, applyTransformations } from '.';
import { expect } from 'chai';

const normalize = (text: string) => text.replace(/[\r]/g, ' ').trim();

describe('addNamedImport', () => {
    it('adds', () => {
        const transform = applyTransformations([
            addNamedImport('test', 'one')
        ]);
        const input = ``;
        const output = `import {one} from "test";`;
        const result = transform(input);

        expect(normalize(result)).to.equal(normalize(output));
    });

    it('skips when present', () => {
        const transform = applyTransformations([
            addNamedImport('test', 'one')
        ]);
        const input = `import {one} from "test";`;
        const output = `import {one} from "test";`;
        const result = transform(input);

        expect(normalize(result)).to.equal(normalize(output));
    });

    it('adds to existing', () => {
        const transform = applyTransformations([
            addNamedImport('test', 'two')
        ]);
        const input = `import {one} from "test";`;
        const output = `import {one, two} from "test";`;
        const result = transform(input);

        expect(normalize(result)).to.equal(normalize(output));
    });
});
