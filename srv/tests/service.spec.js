const cds = require('@sap/cds'),
	request = require('supertest'),
	{
		app,
		server
	} = require('../server');

beforeAll(() => {
	return app.isReady;
});

afterAll(done => {
	server.close(done);
});

describe('service', () => {
	it('can deep insert a new entity', () => {
		return request(app)
			.post('/catalog/A')
			.send({
				// Removing this line breaks the unit test with message:
				//   The key 'mRID' does not exist in the given entity
				"content": "dingen",
			    "B": [{
			    	// Removing this line breaks the unit test with message:
			    	//   An error occurred during serialization of the entity at
			    	//   index #0 in the entity collection. Not nullable value for 'mRID' must not be null.
			    	// "content": "some data",
			        "C": [{
			        	"content": "asldkj"
			        }, {
			        	"content": "qoweuou"
			        }]
			    }]
			})
			.then(response => {
				console.log('RESULT FROM TEST: ', JSON.stringify(response.body));
			})
			.catch(e => {
				console.error('####', e);
			});
	});
});