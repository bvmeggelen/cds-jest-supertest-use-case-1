/*eslint no-console: 0, no-unused-vars: 0, no-undef:0, no-process-exit:0*/
/*eslint-env node, es6 */
'use strict';

const cds = require('@sap/cds'),
	app = require('express')(),
	{
		PORT = 4004
	} = process.env;

app.use((req, res, next) => {
	console.log('REQUEST: ', req.url, req.method);
	next();
});

// connect to primary database if configured
cds.connect(cds.env.requires.db || false);
(() => {
	let appReady = false;
	const service = cds.serve('gen/csn.json')
		.in(app)
		.catch((err) => {
			console.error(err);
			process.exit(1);
		})
		.then(() => {
			appReady = true;
		});

	// This promise can be used to be sure the cds magic has completed and
	// any provisioned endpoint is available. Also, see beforeAll handlers in tests/.
	app.isReady = new Promise((resolve, reject) => {
		const checkForReadiness = (r) => {
			return () => {
				if (!appReady) {
					setTimeout(checkForReadiness(r), 500);
					return false;
				}
				r();
			};
		}
		checkForReadiness(resolve)();
	});
})();

const server = app.listen(PORT, () => {
	console.log(`server running at port ${PORT}`);
});

module.exports = {
	app,
	server
};
