import { spawn, ChildProcessWithoutNullStreams } from 'child_process';

export const runPython = (pythonFile: string, params: Array<string>): Promise<object> => {
  const pyS: ChildProcessWithoutNullStreams = spawn('python3',
    [pythonFile].concat(`"${params}"`));

  return new Promise((resolve, reject): void => {
    pyS.stdout.on('data', (data: Buffer) => {
      const fData: object = JSON.parse(data.toString());
      resolve(fData);
    });

    pyS.stderr.on('data', (err: Buffer) => {
      reject(err.toString());
    });

    pyS.on('close', (status: number) => {
      console.log(`${pythonFile} exited with ${status}`);
    });
  });
};
