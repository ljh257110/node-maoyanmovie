$(function(){
	var arr = [false,false,false];
	function phone(obj1,obj2){
		obj1.focus(function(){
			$(".succ_info").html("");
			obj1.css("border-color","#f76120");
		});
		obj1.blur(function(){
			if(!$(this).val()){
				obj2.css("display","inline-block");
				obj2.find("i").css("background-position","0 -296px");
				obj2.find("em").html("请输入您的手机号码");
			}else if(/^1[3|4|5|7|8][0-9]\d{8}$/.test($(this).val())){
				/*var phone = $(this).val();
				$.ajax({
					url:"/users/login1",
					type:"post",
					dataType:"json",
					data: {phone:phone},
					success:function(data){
						console.log(data);
						
						obj2.find("i").css("background-position","0 -296px");
						obj2.find("em").html("该手机号已被绑定，直接登录");
					}
				})*/
				obj2.css("display","inline-block");
				obj2.find("i").css("background-position","0 -453px");
				obj2.find("em").html("");
				arr[0] = true;
			}else{
				obj2.css("display","inline-block");
				obj2.find("i").css("background-position","0 -296px");
				obj2.find("em").html("请输入正确的11位手机号码");
			}
		})
	}
	phone($(".num_mobile"),$(".content .signup .warn_info").eq(0));
	function password(obj1,obj2){
		obj1.focus(function(){
			obj1.css("border-color","#f76120");
		});
		obj1.blur(function(){
			if(!$(this).val()){
				obj2.css("display","inline-block");
				obj2.find("i").css("background-position","0 -296px");
				obj2.find("em").html("请填写密码");
			}else if(/^\w{6,32}$/.test($(this).val())){
				// alert(1)
				obj2.find("i").css("background-position","0 -453px");
				obj2.find("em").html("");
				arr[1] = true;
			}else if($(this).val().length < 6){
				obj2.css("display","inline-block");
				obj2.find("i").css("background-position","0 -296px");
				obj2.find("em").html("密码太短，至少6个字符");
			}else{
				obj2.find("i").css("background-position","0 -296px");
				obj2.find("em").html("密码太长，最多32个字符");
			}
		})
	}
	password($(".pwd"),$(".content .signup .warn_info").eq(2));
	function change(obj1){
		obj1.on("input propertychange",function(){
			if($(this).val().length < 6){
				$(".content .signup .password .pw_strength .pw_strength_bar").css("width","85px").css("background","#f76120");
			}else if($(this).val().length < 15){
				$(".content .signup .password .pw_strength .pw_strength_bar").css("width","172px").css("background","#ff8900");
			}else{
				$(".content .signup .password .pw_strength .pw_strength_bar").css("width","260px").css("background","#5bab3c");
			}
			
		})
	}
	change($(".pwd"));
	function confirm(obj1,obj2){
		obj1.focus(function(){
			obj1.css("border-color","#f76120");
		});
		obj1.blur(function(){
			if(!$(this).val()){
				obj2.css("display","inline-block");
				obj2.find("i").css("background-position","0 -296px");
				obj2.find("em").html("请再次输入密码");
			}else if($(this).val() == $(".pwd").val()){
				// alert(1)
				obj2.find("i").css("background-position","0 -453px");
				obj2.find("em").html("");
				arr[2] = true;
			}else{
				obj2.css("display","inline-block");
				obj2.find("i").css("background-position","0 -296px");
				obj2.find("em").html("两次输入的密码不一致，请重新输入");
			}
		})
	}
	confirm($(".confirm_input"),$(".content .signup .warn_info").eq(3));



	$(".agree_btn").click(function(){
		// alert(arr);
		for(var i = 0; i < arr.length; i++){
			if(arr[i] == false){
				break;
			}else{
				console.log("success");
				var phone = $(".num_mobile").val();
				var password = $(".pwd").val();	
				// location.href = "http://localhost:3000/";
				$.ajax({
					url:"/users/register",
					type:"post",
					dataType:"json",
					data: {phone:phone,password:password},
					success:function(data){
						console.log(data);
						location.href = "http://localhost:3000/comment";
					}

				})
				break;
			}
		}
		
	})



})