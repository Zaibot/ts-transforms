import { SourceFile, SyntaxKind } from "ts-simple-ast";

export const addNamedExport = (nameModule: string, name: string, alias?: string) => (a: SourceFile) => {
    const astExport = a.getExportDeclaration(x => x.getModuleSpecifier() === nameModule && x.hasNamedExports());
    if (!astExport) {
        a.addExportDeclaration({ moduleSpecifier: nameModule, namedExports: [{ name, alias }] });
        return;
    }
    const hasNamedExport = astExport.getNamedExports().some(x => x.getFirstDescendantByKindOrThrow(SyntaxKind.Identifier).getText() === name/*TODO: && (x.getAliasIdentifier() && x.getAliasIdentifier().getText()) === alias*/);
    if (!hasNamedExport) {
        astExport.addNamedExport({ name, alias });
        return;
    }
};
