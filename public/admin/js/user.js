$(function () {
  //进入页面，发送ajax请求，从后台获取数据渲染页面
  var page = 1;
  var pageSize = 5;
  var id;
  var isDelete;

  render();

  // 按钮的启用与禁用   模板引擎生成，用事件委托
  $("tbody").on("click",".btn",function(){
    // console.log(123);
    // 1.显示模态框   2.修改模态框的样式
    $("#userModal").modal("show");
    // 3.点击确定按钮，切换禁用与启用的状态
    id = $(this).parent().data("id");
    // console.log(id);
    isDelete = $(this).hasClass("btn-success") ? 1 : 0;
  })

  $(".btn_confirm").click(function(){
    //发送请求，渲染当前页面
    $.ajax({
      type:"post",
      url:"/user/updateUser",
      data:{
        id:id,
        isDelete:isDelete
      },
      success:function(info){
        // console.log(info);
        if(info.success){
          // 模态框关闭；
          //重新渲染当前页
          $("#userModal").modal("hide");
          render();
        }
      }
    });

  });


  //渲染页面的函数
  function render() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function (info) {
        console.log(info);
        //渲染数据
        $("tbody").html(template("tpl", info));
        //生成分页
        $(".paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: page,
          totalPages: Math.ceil(info.total / info.size),
          onPageClicked:function(a,b,c,p){
            page = p;
            render();
          }
        });
      }
    });
  }

});