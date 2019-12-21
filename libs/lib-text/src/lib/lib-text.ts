import { BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject, workspaces } from '@angular-devkit/core';
import { Config } from '@stencil/core';
import { NodeJsSyncHost } from '@angular-devkit/core/node';
import * as fs from 'fs';
import * as path from 'path';
const node = require('@stencil/core/sys/node');
const { Compiler } = require('@stencil/core/dist/compiler');

declare var require: any;

interface Options extends JsonObject {
  command: string;
  args: string[];
}

const doit = rootDir => {
  const sys = new node.NodeSystem();
  const logger = new node.NodeLogger();

  const config: Config = {
    namespace: 'demo',

    outputTargets: [
      {
        type: 'dist',
        esmLoaderPath: '../../web-comps/src/lib/loader'
      },
      {
        type: 'angular',
        componentCorePackage: '@nx-learn/stencil-lib',
        directivesProxyFile: '../web-comps/src/lib/stencal/proxies.ts',
        directivesUtilsFile: '../web-comps/src/lib/stencal/proxies-utils.ts',
        directivesArrayFile: '../web-comps/src/lib/stencal/proxies-list.ts',
        excludeComponents: []
      }
      // {
      //   type: 'docs-readme'
      // },
      // {
      //   type: 'www',
      //   serviceWorker: null // disable service workers
      // }
    ]
  };

  // config.srcDir = 'src',

  // config.writeLog = false

  console.log('Stencal config', config);

  config.sys = sys;
  config.logger = logger;

  console.log('root path', rootDir, path.resolve(rootDir)); // , path.resolve(rootDir))

  (config as any).rootDir = path.resolve(rootDir); // 'C:/dev/stencil-example/demo';
  config.validateTypes = false;
  (config as any).logLevel = 'debug';

  const compiler = new Compiler(config);

  // compiler

  return compiler.build();
};

export default createBuilder<Options>(async (options, context) => {
  return new Promise<BuilderOutput>(async (resolve, reject) => {
    context.reportStatus(`Executing "${options.command}"...`);

    // console.log('builder', context.builder);
    console.log('currentDirectory', context.currentDirectory);
    console.log('target', context.target);
    console.log(
      'getTargetOptions',
      await context.getTargetOptions(context.target)
    );
    console.log('workspaceRoot', context.workspaceRoot);
    // console.log('analytics', context.analytics);
    // console.log('options', options);

    const workspaceHost = workspaces.createWorkspaceHost(new NodeJsSyncHost());
    const { workspace } = await workspaces.readWorkspace(
      context.workspaceRoot,
      workspaceHost
    );

    const props = workspace.projects.get(context.target.project);

    console.log('props', props);

    const result = await doit(props.root);

    // console.log('result', result);

    // const child = childProcess.spawn(options.command, options.args, { stdio: 'pipe' });

    // child.stdout.on('data', (data) => {
    //   context.logger.info(data.toString());
    // });
    // child.stderr.on('data', (data) => {
    //   context.logger.error(data.toString());
    //   reject();
    // });

    // console.log('Help')

    context.reportStatus(`Done.`);
    // child.on('close', code => {
    resolve({ success: true });
    // });
  });
});
