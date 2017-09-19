define(['jquery', 'cookie'], function ($) {
  // NProgress.start();

  // NProgress.done();

  $('.navs ul').prev('a').on('click', function () {
    $(this).next().slideToggle();
  });
  // 退出登录
  $('#loginOutBtn').click(function () {
    $.ajax({
      url: '/api/logout',
      type: 'post',
      dataType: 'json',
      success: function (data) {
        if (data.code == 200) {}
        location.href = '/main/login';
        // console.log($.cookie('loginfo'));
        // 请求成功则删除 cookie
        $.removeCookie('PHPSESSID');
      }
    })
  })
  // 如果cookie不存在那么跳转到login界面
  if (!$.cookie('PHPSESSID') && location.pathname != '/main/login') {
    location.href = '/main/login'
  }
  // 设置用户信息
  var loginfo = loginfo && JSON.parse($.cookie('loginfo'));
  if (loginfo) {
    $('#loginfo div img').attr('src', loginfo.tc_avatar);
    $('#loginfo h4').html(loginfo.tc_name);
  }

  // console.log(JSON.parse($.cookie('loginfo')));
});
