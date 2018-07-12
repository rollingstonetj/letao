  // 进度条
  // jquery 中ajax的六个全局事件
  // ajaxStart();
  // ajaxSend();
  // ajaxSuccess();
  // ajaxError();
  // ajaxComplete();
  // ajaxStop();

  $(document).ajaxStart(function(){
    NProgress.start();
  });
  $(document).ajaxStop(function(){
    setInterval(function(){
      NProgress.done();
    },500);
  
  });

  
  // 控制二级菜单的显示与隐藏
  $(".second").prev().on("click",function(){
    $(this).next().slideToggle();
  });

  // 退出功能
  $(".icon_logout").on("click", function () {
    $("#logoutModal").modal("show");
  });
  
  //给退出按钮注册事件
  $(".btn_logout").on("click", function () {
    
    //先发送ajax请求，告诉服务，我要退出，服务告诉你退出成功了，再跳转到login页面
    $.ajax({
      type: 'get',
      url: '/employee/employeeLogout',
      success: function(info){
        if(info.success) {
          location.href = "login.html";
        }
      }
    });
    
  });

  // 侧边栏的隐藏
  $(".icon_menu").click(function () {
    // console.log("haha");
   $(".lt_aside").toggleClass("active");
   $("body").toggleClass("active");
  });
