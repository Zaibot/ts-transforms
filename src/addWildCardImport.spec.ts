import { addWildCardImport, applyTransformations } from '.';

const normalize = (text: string) => text.replace(/[\r]/g, ' ').trim();

describe('addWildCardImport', () => {
    it('adds', () => {
        const transform = applyTransformations([
            addWildCardImport('test', 'one')
        ]);
        const input = ``;
        const output = `import * as one from "test";`;
        const result = transform(input);

        expect(normalize(result)).toBe(normalize(output));
    });
    
    it('skips when present', () => {
        const transform = applyTransformations([
            addWildCardImport('test', 'one')
        ]);
        const input = `import * as one from "test";`;
        const output = `import * as one from "test";`;
        const result = transform(input);

        expect(normalize(result)).toBe(normalize(output));
    });
});
