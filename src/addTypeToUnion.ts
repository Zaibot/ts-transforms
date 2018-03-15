import { SourceFile, SyntaxKind } from "ts-simple-ast";

export const addTypeToUnion = (type: string, additional: string) => (a: SourceFile) => {
    const astExport = a.getTypeAlias(type);
    if (!astExport) { return; }
    const intersection = astExport.getFirstChildByKindOrThrow(SyntaxKind.IntersectionType);
    const syntax = intersection.getFirstChildIfKindOrThrow(SyntaxKind.SyntaxList);
    const types = syntax.getText().match(/\w+/g);
    if (!types) { return; }
    if (types.some(x => x === additional)) { return; }
    types.push(additional);
    syntax.replaceWithText((writer) => {
        for (let i = 0, ii = types.length; i < ii; i++) {
            if (i > 0) {
                writer.newLine();
                writer.indent();
            }
            writer.write(types[i]);
            if (i < ii - 1) {
                writer.write(` &`);
            }
        }
    });
};
