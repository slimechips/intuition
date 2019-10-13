import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

export const runPython = (pythonFile: string, params: Array<string>): Promise<object> => {
  const pyS: ChildProcessWithoutNullStreams = spawn('/usr/bin/python3.6',
    [pythonFile].concat(`"${params}"`));
  return new Promise((resolve, reject): void => {
    pyS.stdout.on('data', (data: Buffer) => {
      try {
        const fData: object = JSON.parse(data.toString());
        resolve(fData);
      } catch (err) {
        console.log(data.toString());
        reject(err);
      }
    });

    pyS.stderr.on('data', (err: Buffer) => {
      reject(err.toString());
    });

    pyS.on('close', (status: number) => {
      console.log(`${pythonFile} exited with ${status}`);
    });
  });
};
