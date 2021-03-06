import { SourceFile, VariableDeclarationType } from "ts-simple-ast";

export const addTypeToVariable = (name: string, additional: string) => (a: SourceFile) => {
    const astExport = a.getVariableDeclaration(name);
    if (!astExport) {
        a.addVariableStatement({
            declarationType: VariableDeclarationType.Const,
            isExported: true,
            declarations: [
                { name: name, type: additional, initializer: 'TODO' }
            ]
        })
        return;
    }
    const intersection = astExport.getTypeNode();
    if (!intersection) { return; }
    const types = intersection.getText().match(/\w+/g);
    if (!types) { return; }
    if (types.some(x => x === additional)) { return; }
    types.push(additional);
    intersection.replaceWithText((writer) => {
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
