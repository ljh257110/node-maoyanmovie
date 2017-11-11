$(function(){
	$(".btn").click(function(){
		console.log("success");
		var phone = $(".phone").val();
		var password = $(".pwd").val();	
		// console.log({phone:phone,password:password});
		$.ajax({
			url:"/users/ajax",
			type:"post",
			dataType:"json",
			data: {phone:phone,password:password},
			success:function(data){
				console.log(data);
			}
			
		})
	})



})