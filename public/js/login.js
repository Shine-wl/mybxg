define(['jquery','cookie'],function ($) {
  //实现登录功能
   $('#loginBtn').click(function () {
      $.ajax({
        url: '/api/login',
        type: 'post',
        data: $('#loginForm').serialize(),
        dataType: 'json',
        success: function (data) {
          console.log(123)
          console.log(data);
          if (data.code == 200) {
            location.href = '/main/index';
            $.cookie('loginfo',JSON.stringify(data.result));
            // "window.location.href"、"location.href"
            // 是本页面跳转
            //   "parent.location.href"
            // 是上一层页面跳转
            //   "top.location.href"
            // 是最外层的页面跳转
          }
        }
      });
      return false; //阻止默认行为
    });
});
