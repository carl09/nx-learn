import { existsSync } from 'fs';
import { join } from 'path';
import * as minimist from 'minimist';
import * as ts from 'typescript';
import * as fs from 'fs';
// const fs = require('fs');

const compile = (fileName: string, options: ts.CompilerOptions): number => {
  const program = ts.createProgram([fileName], options);
  const emitResult = program.emit();

  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start!
      );
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        '\n'
      );
      console.log(
        `${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`
      );
    } else {
      console.log(
        ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n')
      );
    }
  });

  const exitCode = emitResult.emitSkipped ? 1 : 0;
  // console.log(`Process exiting with code '${exitCode}'.`);
  return exitCode;
};

const loadConfig = (
  rootDir: string,
  projectPath: string,
  outDir: string
): ts.CompilerOptions => {
  const result = ts.readConfigFile(configFile, ts.sys.readFile);
  const config = result.config;

  const jsonConfigContent = ts.parseJsonConfigFileContent(
    config,
    ts.sys,
    rootDir,
    undefined,
    'tsconfig.lib.json'
  );

  const compilerOptions: ts.CompilerOptions = jsonConfigContent.options;

  compilerOptions.rootDir = join(rootDir, projectPath, 'src');
  compilerOptions.outDir = outDir;

  // console.log('opt', compilerOptions);
  return compilerOptions;
};

const argv = minimist(process.argv.slice(2));

const root = join(__dirname, '../..');
const outputPath = join(root, argv.outputPath);
const projectIndex = join(root, argv.project, 'src', 'index.ts');
const configFile = join(root, argv.project, 'tsconfig.lib.json');

const result = compile(projectIndex, loadConfig(root, argv.project, outputPath));

console.log('result', result)

const schema = join(root, argv.project, 'src', 'lib', 'schema.json');

fs.copyFile(schema, join(outputPath, 'schema.json'), err => {
  console.log(err);
});
