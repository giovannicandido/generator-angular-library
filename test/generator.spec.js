'use strict';

const os = require('os');
const inquirerTest = require('inquirer-test');
const shelljs = require('shelljs');

const cliPath = `${__dirname}/../node_modules/.bin/yo`;
const tmpDir = `${os.tmpdir()}/generator-angular-lib-test`;
const inquirerTimeout = 1000;

describe('generator', () => {
  it('should run successfully', () => {
    console.info('Testing generator in', tmpDir);

    shelljs.rm('-rf', tmpDir);
    shelljs.mkdir(tmpDir);
    shelljs.exec('npm link');
    shelljs.cd(tmpDir);

    return inquirerTest(cliPath, [
      inquirerTest.ENTER,
      'mattlewis92',
      inquirerTest.ENTER,
      'test',
      inquirerTest.ENTER,
      'test',
      inquirerTest.ENTER,
      inquirerTest.ENTER,
      inquirerTest.ENTER,
      'mwl',
      inquirerTest.ENTER,
      'Test',
      inquirerTest.ENTER,
      inquirerTest.ENTER,
      inquirerTest.ENTER
    ], inquirerTimeout).then(() => {
      const testResult = shelljs.exec('npm test');
      shelljs.rm('-rf', tmpDir);
      if (testResult.code !== 0) {
        return Promise.reject('Generator test failed');
      }
    });
  });
});

