2017-02-23, Version 7.0.0
=========================

 * package: drop support for node < 4.x (Sam Roberts)

 * package: update strong-supervisor to 6.x (Sam Roberts)


2016-11-04, Version 6.0.0
=========================

 * test: node 0.10 uses numeric signal status (Sam Roberts)

 * runner: don't restart a stopped app (Sam Roberts)

 * test: piped stdio may be truncated during shutdown (Sam Roberts)

 * test: log stdio as comment, and cleanup listeners (Sam Roberts)

 * package: update strong-supervisor to 5.x (Sam Roberts)

 * test: skip replace tests on win32 (Sam Roberts)

 * runner: do not use DEBUG to skip IO piping (Sam Roberts)

 * test: update byline to 5.x (Sam Roberts)

 * test: update bl to 1.x (Sam Roberts)

 * package: update tap to 7.x (Sam Roberts)

 * package: update eslint to 2.x (Sam Roberts)

 * test: direct console output to debug() (Sam Roberts)

 * package: update lodash to 4.x (Sam Roberts)

 * Update URLs in CONTRIBUTING.md (#20) (Ryan Graham)


2016-05-06, Version 5.0.3
=========================

 * update copyright notices and license (Ryan Graham)


2016-04-11, Version 5.0.2
=========================

 * Refer to licenses with a link (Sam Roberts)


2015-10-01, Version 5.0.1
=========================

 * Use strongloop conventions for licensing (Sam Roberts)


2015-09-16, Version 5.0.0
=========================

 * package: depend on supervisor chdiring on restart (Sam Roberts)

 * runner: restart using control channel, not SIGHUP (Sam Roberts)

 * runner: always use absolute symlink (Sam Roberts)

 * test: port to tap@1.3.4 (Sam Roberts)


2015-07-27, Version 4.0.0
=========================

 * app: don't log requests that are not made (Sam Roberts)

 * runner: allow request() to be external (Sam Roberts)

 * test: add hack to please tap4j/Jenkins (Ryan Graham)

 * deps: remove all unused dependencies (Ryan Graham)

 * lint before running tests, including test code (Ryan Graham)

 * deps: remove unused async dependency (Ryan Graham)

 * deps: update eslint and lodash (Ryan Graham)

 * lint: ensure eslint runs recursively (Ryan Graham)

 * don't pollute test output with logs (Ryan Graham)

 * allow control channel to be passed in (Ryan Graham)

 * test: update tests for supervisor@3 (Ryan Graham)

 * test: update tests to work better with tap@1 (Ryan Graham)

 * Update tap, eslint and jscs as dev dependencies (Krishna Raman)

 * Bump strong-supervisor depdendency (Krishna Raman)


2015-06-03, Version 2.0.0
=========================

 * app: pipe child stdio on restart (Sam Roberts)

 * stdio: pass noStdioDebug when called without new (Sam Roberts)

 * Upgrade supervisor to v2.x (Sam Roberts)

 * win: fix issue with symlinking (Bert Belder)


2015-05-14, Version 1.0.2
=========================

 * Support not piping child stdio (Sam Roberts)


2015-04-23, Version 1.0.1
=========================

 * First release!
