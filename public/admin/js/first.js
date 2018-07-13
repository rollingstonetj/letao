$(function(){
  //发送ajax请求,获取数据，渲染页面
  var page = 1;
  var pageSize = 5;
  render();

  //给添加分类按钮注册点击事件
  $(".btn_add").click(function(){
    // 点击按钮显示模态框
    $("#addModal").modal("show");
  });

    //2. 表单校验的功能
    $("form").bootstrapValidator({
      fields: {
        categoryName: {
          validators: {
            notEmpty: {
              message: '一级分类的名称不能为空',
            }
          }
        }
      },
      // 配置小图标的规则
      feedbackIcons: {
        valid: 'glyphicon glyphicon-thumbs-up',
        invalid: 'glyphicon glyphicon-thumbs-down',
        validating: 'glyphicon glyphicon-refresh'
      }
    });

    // 校验成功之后，执行的函数
    $("form").on("success.form.bv",function(e){
      // 阻止默认提交
      e.preventDefault();
      // 使用ajax发送请求
      $.ajax({
        type:"post",
        url:"/category/addTopCategory",
        data:$("form").serialize(),
        success:function(info){
          console.log(info);
          // 成功的时候,清除模态框，重新渲染第一页
          if(info.success){
            $("#addModal").modal("hide");
            page = 1;
            render();
            // 重置表单
            $("form").data("bootstrapValidator").resetForm(true);
          }
        }
      });
    })

  function render(){
    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:page,
        pageSize:pageSize,
      },
      success:function(info){
        // console.log(info);
        $("tbody").html(  template("tpl" ,info));

        // 分页标签的实现
       
        $(".paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total / info.size),
          onPageClicked:function(a,b,c,p){
            page = p;
            render();
          }
        });
      }
    });
  }
});