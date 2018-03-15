import { SourceFile } from "ts-simple-ast";

export const addWildCardImport = (nameModule: string, nameVar: string) => (a: SourceFile) => {
    const astImport = a.getImportDeclaration(x => x.getModuleSpecifier() === nameModule && !!x.getNamespaceImport());
    if (!astImport) {
        a.insertImportDeclaration(0, { namespaceImport: nameVar, moduleSpecifier: nameModule });
    }
}