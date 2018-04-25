var bodyParser = require('body-parser');
var Web3 = require('web3');
var contract = require('truffle-contract');
var addgame_artifacts = require('../build/contracts/AddGame.json')
var AddGame = contract(addgame_artifacts);
var provider = new Web3.providers.HttpProvider("http://localhost:8545");

var web3 = new Web3(provider);

module.exports = function(app) {

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	

	
	app.get('/', function(req, res) {
		res.render('index');
	});


	app.post('/addPlayer', function(req, res){

		var age = req.body.age;
		var name = req.body.name;
		var ethaddress = web3.eth.accounts[1];

		AddGame.setProvider(provider);
		var game;

		AddGame.deployed().then(function(instance) {
			game = instance;
			return game.addPlayer(age, name, {from: ethaddress});
		  }).then(function(value) {
			console.log(value.valueOf())
			res.send("added");
		  }).catch(function(e) {
			console.log(e);
		});

});


	app.get('/getPoints', function(req, res) {
		AddGame.setProvider(provider);
		var game;
		AddGame.deployed().then(function(instance) {
		  game = instance;
		  return game.getPoints.call(web3.eth.accounts[1], {from: web3.eth.accounts[0]});
		}).then(function(value) {
		  console.log(value.valueOf())
		  res.send(value.valueOf());
		}).catch(function(e) {
		  console.log(e);
		});

		//res.send("ok");
	});


	app.post('/calculateResult', function(req, res){
		
		console.log('body: ' + JSON.stringify(req.body));
		let no1 = req.body.no1;
		let no2 = req.body.no2;
		let result = +req.body.ans;

		const serverAnswer = +no1 + +no2;

		console.log("answer from server", serverAnswer);

		if(serverAnswer === result) {
			//correct answer fire an web3 api to add 100 points

			AddGame.setProvider(provider);
			var game;

			AddGame.deployed().then(function(instance) {
				game = instance;
				return game.addPoints(web3.eth.accounts[1], 100, {from: web3.eth.accounts[0]});
		  	}).then(function(value) {
				console.log(value.valueOf())
				res.send("added points");
		  	}).catch(function(e) {
				console.log(e);
			});

		}else{
			res.send("incorrect");
		}

	});
	
}