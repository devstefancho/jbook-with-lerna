import path from 'path';
import { Command } from 'commander';
import { serve } from '@jsnote/local-api';

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(
        `port is running on ${options.port}. Navigate to http://localhost:${options.port}/ to access your application`
      );
    } catch (err: unknown | Error) {
      if (err instanceof Error) {
        console.log(err.message);
        return process.exit(1);
      }
      console.log(err);
      process.exit(1);
    }
  });

// [] is optional value, <> is requried value
