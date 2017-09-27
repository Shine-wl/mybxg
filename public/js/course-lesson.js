define(['jquery', 'template', 'util', 'bootstrap', 'form'], function ($, template, util) {
  util.setMenu('/course/add');
  var csId = util.qs('cs_id');
  $.ajax({
    url: '/api/course/lesson',
    type: 'get',
    dataType: 'json',
    data: {
      cs_id: csId
    },
    success: function (data) {
      var html = template('lessonTpl', data.result);
      $('#lessonInfo').html(html);
      // 添加课时
      $('#addLesson').click(function () {
        var html = template('modalTpl', { operate: '添加课时' });
        $('#modalInfo').html(html);
        $('#chapterModal').modal();
        // 处理添加表单
        $('#addBtn').click(function () {
          $('#lessonForm').ajaxSubmit({
            url: '/api/course/chapter/add',
            dataType: 'json',
            type: 'post',
            data: {
              ct_cs_id: csId
            },
            success: function (data) {
              if (data.code) {
                location.reload();
              }
            }
          })
        })
      });
      // 编辑课时
      $('.editLesson').click(function () {
        var ctId = $(this).attr('data-ctId');
        $.ajax({
          type: 'get',
          url: '/api/course/chapter/edit',
          data: {
            ct_id: ctId
          },
          dataType: 'json',
          success: function (data) {
            //解析数据
            data.result.operate = '编辑课时'
            var html = template('modalTpl', data.result);
            $('#modalInfo').html(html);
            // 显示模态框
            $('#chapterModal').modal();
            // 处理编辑表单
            $('#addBtn').click(function () {
              $('#lessonForm').ajaxSubmit({
                url: '/api/course/chapter/modify',
                dataType: 'json',
                type: 'post',
                data: {
                  ct_cs_id: csId,
                  ct_id:ctId
                },
                success: function (data) {
                  if (data.code) {
                    location.reload();
                  }
                }
              })
            })
          }
        })
      });
    }
  })
});
