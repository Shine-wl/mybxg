define(['jquery', 'template','bootstrap'], function ($, template) {
  $.ajax({
    url: '/api/teacher',
    type: 'get',
    dataType: 'json',
    success: function (data) {
      var html = template('teacherTpl', { list: data.result });
      $('#teacherInfo').html(html);
      //注销和启用开始
      $('.eod').click(function () {
        var that = this;
        //获取距离最近的父元素
        var td = $(this).closest('td');
        var tcId = td.attr('data-tcId');
        var tcStatus = td.attr('data-status');
        // 调用后台数据
        $.ajax({
          url: '/api/teacher/handle',
          type: 'post',
          data: {
            tc_id: tcId,
            tc_status: tcStatus
          },
          dataType: 'json',
          success: function (data) {
            if (data.code == 200) {
              td.attr('data-status', data.result.tc_status);
              if (data.result.tc_status == 0) {
                $(that).text('启用');
              } else {
                $(that).text('注销');
              }
            }
          }
        })
      })
      // 注销和启用结束

      // 查看开始
      $('.preview').click(function () {
        var td = $(this).closest('td');
        var tcId = td.attr('data-tcId');
        $.ajax({
          url: '/api/teacher/view',
          data: { tc_id: tcId },
          type: 'get',
          success: function (data) {
            if (data.code==200) {
              $('#teacherModal').modal();
              var html=template('moduleTpl',data.result);
              $('#moduleInfo').html(html);
            }
          }
        })
      })
      // 查看结束

    }
  })
})
