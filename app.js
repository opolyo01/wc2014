// initialize app
var ACS = require('acs').ACS;

function start(app, express) {
	ACS.init('KatLQVAP7yOBPW4X0oKTFXRYPbgu1VBm', 'QMC6Dxu5m8wbYNwBYnj7mmHiKIAxLvsI');
	app.use(express.cookieParser());
	app.use(express.session({ key: 'node.acs', secret: "my secret" }));
	
	//set favicon
	app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
}

// release resources
function stop() {
	
}