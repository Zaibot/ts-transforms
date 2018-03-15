import { SourceFile } from "ts-simple-ast";

export const addWildCardExport = (nameModule: string) => (a: SourceFile) => {
    const astExport = a.getExportDeclaration(x => x.getModuleSpecifier() === nameModule && x.isNamespaceExport());
    if (!astExport) {
        a.addExportDeclaration({ moduleSpecifier: nameModule });
    }
};
