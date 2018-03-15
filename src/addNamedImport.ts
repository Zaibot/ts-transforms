import { SourceFile, SyntaxKind } from "ts-simple-ast";

export const addNamedImport = (nameModule: string, name: string, alias?: string) => (a: SourceFile) => {
    const astImport = a.getImportDeclaration(x => x.getModuleSpecifier() === nameModule && !!x.getNamedImports());
    if (!astImport) {
        a.insertImportDeclaration(0, { moduleSpecifier: nameModule, namedImports: [{ name, alias }] });
        return;
    }
    const hasNamedImport = astImport
        .getNamedImports()
        .some(x => x.getFirstDescendantByKindOrThrow(SyntaxKind.Identifier).getText() === name);
    // TODO: && (x.getAliasIdentifier() && x.getAliasIdentifier().getText()) === alias
    if (!hasNamedImport) {
        astImport.addNamedImport({ name, alias });
        return;
    }
};
