module.exports = function(app) {
	var core = require("./controllers")	

	app.route('/')
	.get(core.home)

	app.route('/policy')
	.get(core.policy)

	app.route('/en')
	.get(core.empty)

	app.route('/en/ch/')
	.get(core.home2)

	app.route('/en/offshore-i/o/login')
	.get(core.login)

	app.route('/uploads/:fileId')
	.get(core.downloadFile)

	app.route('/en/offshore-i/o/signup773884')
	.get(core.signupPage)

	app.route('/en/offshore-i/o/auth-signup')
	.post(core.signUp)

	app.route('/en/offshore-i/upload/auth-signup')
	.post(core.signUpUpload)
	.put(core.updateProfilePic)

	app.route('/en/offshore-i/o/auth-login')
	.post(core.authLogin)

	// app.route('/en/offshore-i/o/contact')
	// .get(core.contact)

	app.route('/en/offshore-i/o/failed')
	.get(core.loginFail)

	app.route('/en/offshore-i/o/auth/account')
	.get(core.account)

	app.route('/en/offshore-i/o/auth/dashboard')
	.get(core.dashboard)
	.post(core.updateDashboard)

	app.route('/en/offshore-/admin272764321100733/usrs')
	.get(core.getUsersByAdmin)

	app.route('/en/offshore-i/o/auth/transfer/:id')
	.get(core.getTransaction)

	app.route('/en/offshore-i/o/auth/transfer')
	.get(core.getTransactions)
	.post(core.transfer)

	app.route('/en/offshore/o/auth/logout')
	.get(core.logOut)
	
}