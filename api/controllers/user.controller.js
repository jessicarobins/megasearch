const passport = require("passport")

exports.login = async function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
		if(err) return next(err)
		if(!user) {
			return res.json({ success: false, message: info.message })			
		}	
		req.login(user, loginErr => {
			if(loginErr) {
				return res.json({ success: false, message: loginErr })
			}
			return res.json({ success: true, message: "authentication succeeded" })
		})
	})(req, res, next)
}