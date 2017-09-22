define(['jquery', 'template', 'cookie'], function ($, template) {
  // NProgress.start();

  // NProgress.done();

  $('.navs ul').prev('a').on('click', function () {
    $(this).next().slideToggle();
  });
  $('.navs ul li a').click(function(){
     $(this).addClass('active').closest('li').siblings('li').children('a').removeClass('active'); 
  })
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
  var loginfo = $.cookie('loginfo');
  // console.log(loginfo)
  loginfo = loginfo && JSON.parse($.cookie('loginfo'));

  if ($.cookie('loginfo')) {
    var tpl = '<div class="avatar img-circle"><img src="{{tc_avatar}}"></div><h4>{{tc_name}}</h4>';
    var html = template.render(tpl, loginfo);
    $('#logfo').html(html);
  }
});
