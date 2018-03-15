import Ast, { SourceFile } from "ts-simple-ast";

export const applyTransformations = (transforms: ((source: SourceFile) => SourceFile | void)[]) => (text: string) => {
    const ast = new Ast();
    const file = ast.createSourceFile('__temp_by_zaibot_ts-transforms__');
    file.replaceWithText(text);
    const transformed = transforms.reduce((state, cur) => cur ? cur(state) || state : state, file);
    return transformed.getFullText();
};
