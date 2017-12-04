'use strict';

module.exports = function(_ , passport, User){
	return {
		SetRouting : function (router){
			router.get('/',this.indexPage);
			router.get('/signup',this.getSignUp);
			router.get('/home',this.homePage);
			
			
			
			router.post('/', User.LoginValidation, this.postLogin);
			router.post('/signup',User.SignUpValidation, this.postSignUp);
		},
		
		indexPage : function (req,res){
			const errors = req.flash('error');
			return res.render('index',{title : 'Chat Application | Login', messages : errors, hasErrors : errors.length > 0});
		},
		
		postLogin : passport.authenticate('local.login',{
			sucessRedirect : '/home',
			failureRedirect : '/',
			failureflash : true
		}),
		
		getSignUp : function (req,res){
			const errors = req.flash('error');
			return res.render('signup',{title : 'Chat Application | Signup', messages : errors, hasErrors : errors.length > 0});
		},
		
		postSignUp : passport.authenticate('local.signup',{
			sucessRedirect : '/home',
			failureRedirect : '/signup',
			failureflash : true
		}),
		
		homePage : function (req,res){
			return res.render('home.ejs');
		}
	}
}