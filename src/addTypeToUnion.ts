import { SourceFile, SyntaxKind } from "ts-simple-ast";

export const addTypeToUnion = (type: string, additional: string) => (a: SourceFile) => {
    const astExport = a.getTypeAlias(type);
    if (!astExport) {
        a.addTypeAlias({ name: type, type: additional, isExported: true });
        return;
    }
    const astType = astExport.getTypeNodeOrThrow();
    const types = astType.getText().match(/\w+/g);
    if (!types) { return; }
    if (types.some(x => x === additional)) { return; }
    types.push(additional);
    astType.replaceWithText((writer) => {
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
