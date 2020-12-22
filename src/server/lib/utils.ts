import {Request, Response, NextFunction} from 'express';
import {promisify} from 'util';
import {ExecOptions} from 'child_process';

const exec = promisify(require('child_process').exec);

const options: ExecOptions = {
  cwd: process.env.LOOKUP_DIR_PATH,
  shell: '/bin/zsh'
};

const extensions = ['styl', 'tsx', 'ejs', 'js', 'ts'];

export async function getFindings(whitelabelTag: string) {
  if (!whitelabelTag.startsWith('__WT-')) {
    throw new Error('Whitelabel tag should start with __WT-');
  }

  const INCLUDE = `--include=\\*.{${extensions.join(',')}}`;
  const EXCLUDE = `--exclude-dir={node_modules,dist,git}`;

  const filesNoCmd = `grep -Ril ${INCLUDE} ${EXCLUDE} "${whitelabelTag}" . | wc -l`;
  const occurencesNoCmd = `grep -Ri ${INCLUDE} ${EXCLUDE} "${whitelabelTag}" . | wc -l`;
  
  const [{ stdout: filesNo }, { stdout: occurencesNo }] = await Promise.all([
    exec(filesNoCmd, options),
    exec(occurencesNoCmd, options)
  ])  
  
  return `${occurencesNo.trim()} results in ${filesNo.trim()} files`;
}

export const bindCatch = (fn: Function) => (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res, next)).catch(next);