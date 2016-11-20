const path = require('path');
const execFile = require('child_process').execFile;
const assert = require('assert');
const exiftool = require('../index');

describe('exiftool', function () {
	this.timeout(5000);
	it('should export a path to current executable', function () {
		const exePath = path.join(__dirname, '../node_modules/exiftool.exe/vendor/exiftool.exe');
		const plPath = path.join(__dirname, '../node_modules/exiftool.pl/vendor/exiftool');
		if (process.platform === 'win32') {
			assert.equal(exiftool, exePath);
		} else {
			assert.equal(exiftool, plPath);
		}
	});
	it('should be able to run the executable', function (done) {
		execFile(exiftool, ['-echo', 'test-out', '-echo2', 'test-err'], (err, stdout, stderr) => {
			if (err) {
				done(err);
				return;
			}
			assert.equal(stdout.trim(), 'test-out');
			assert.equal(stderr.trim(), 'test-err');
			done();
		});
	});
	it('should have version 10.33', function (done) {
		execFile(exiftool, ['-ver'], (err, stdout, stderr) => {
			if (err) {
				done(err);
				return;
			}
			assert.equal(stdout.trim(), '10.33');
			done();
		});
	});
});
