define(['jquery', 'template', 'util', 'form'], function ($, template, util) {
  //设置导航菜单选中
  util.setMenu(location.pathname);

  $('#courseBtn').click(function () {
    console.log(123)
    $('#courseForm').ajaxSubmit({
      type: 'post',
      url: '/api/course/create',
      dataType: 'json',
      success: function (data) {
        if (data.code==200) {
          location.href='/course/basic?cs_id='+data.result.cs_id;
        }
      }
    })
  })
})
