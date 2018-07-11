$(function () {
  // 1.登录功能  验证表单的功能
  $("form").bootstrapValidator({
    //设置角标(√ ×)

    //指定校验内容
    fields: {
      //校验用户名，对应表单的name属性
      username: {
        validators: {
          notEmpty: {
            'message': '用户名不能为空'
          },
          stringLength: {
            min:3,
            max:6,
            'message': '用户名的长度为3-6位',
          },
          callback:{
            message:"用户名不存在",
          }
        }
      },
      password: {
        validators:{
          notEmpty: {
            'message': '密码不能为空'
          },
          stringLength: {
            min:6,
            max:12,
            'message': '密码的长度为6-12位',
          },
          callback:{
            message:"密码错误",
          }

        }
      }
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    },

  });

  // 2.给表单注册一个校验成功的事件
  $("form").on("success.form.bv",function(e){
      //阻止默认提交  提交会刷新  用ajax 来提交页面
      e.preventDefault();
      $.ajax({
        type:"post",
        url:"/employee/employeeLogin",
        data:$("form").serialize(),
        success:function(info){
          // console.log(info);
          if(info.error === 1000){
            // 用户名不能为空
            $("form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
          }
          if(info.error === 1001){
            // alert("密码错误");
            $("form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
          }
          if(info.success){
            // 跳转到index.html页面
            location.href = "index.html";
          }
        }
      });
  });

  // 3.重置按钮清除角标
  $("[type='reset']").on("click",function(){
    // reset只能清除form表单中的内容，清除不了   点击重置按钮要把样式和内容都清空
    $("form").data('bootstrapValidator').resetForm(true);
  });

  //4.登录信息提示按钮








});