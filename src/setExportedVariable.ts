import { SourceFile, VariableDeclarationType } from "ts-simple-ast";

export const setExportedVariable = (name: string, declaration: string) => (a: SourceFile) => {
    const astExport = a.getVariableDeclaration(name);
    if (astExport) {
        astExport.remove();
    }

    a.addVariableStatement({
        isExported: true,
        declarationType: VariableDeclarationType.Const,
        declarations: [
            { name, initializer: declaration }
        ]
    });
};
