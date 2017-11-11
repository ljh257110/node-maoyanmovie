$(function(){

	function phone(obj1,obj2){
		obj1.focus(function(){
			$(".succ_info").html("");
			obj1.css("border-color","#f76120");
		});
		obj1.blur(function(){
			obj1.css("border-color","#aaa");
			
		})
	}
	phone($("#login-phone"),$(".content .signup .warn_info").eq(0));
	function password(obj1,obj2){
		obj1.focus(function(){
			$(".succ_info").html("");
			obj1.css("border-color","#f76120");
		});
		obj1.blur(function(){
			obj1.css("border-color","#aaa");
			
		})
	}
	password($("#login-password"),$(".content .signup .warn_info").eq(0));
	$(".login_btn").click(function(){
		if(!$("#login-phone").val()){
			$(".validate_info").css("visibility","visible").find("em").html("请输入账号");
		}else if(!$("#login-password").val()){
			$(".validate_info").css("visibility","visible").find("em").html("请输入密码");
		}else{
			$(".validate_info").css("visibility","hidden");
			console.log("success");
			var phone = $(".phone").val();
			var password = $(".pwd").val();	
			// console.log({phone:phone,password:password});
			$.ajax({
				url:"/users/login",
				type:"post",
				dataType:"json",
				data: {phone:phone,password:password},
				success:function(data){
					console.log(data);
					location.href = "http://localhost:3000/comment";
				}
				
			})
			$(".validate_info").css("visibility","visible").find("em").html("账号或密码错误，请重新输入，建议使用手机号短信验证码登录");
		}
		
	})



})