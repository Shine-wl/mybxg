define(['util', 'jquery', 'template','datepicker','lanugare'], function (u, $, template) {
  var tcId = u.qs('tc_id');
  if (tcId) {
    // 编辑操作
    $.ajax({
      url: '/api/teacher/edit',
      data: {
        tc_id: tcId
      },
      type: 'get',
      dataType: 'json',
      success: function (data) {
        console.log(data)
        var html = template('teacherTpl', data.result);
        $('#teacherInfo').html(html);
          submitForm('/api/teacher/update');
      }
    })
  } else {
    // 添加操作
    var html = template('teacherTpl', {});
    $('#teacherInfo').html(html);
    submitForm('/api/teacher/add');
  }
  // 表单提交
  function submitForm(url) {
    $('#teacherBtn').click(function () {
      console.log($('#teacherForm').serialize())
      $.ajax({
        url: url,
        data: $('#teacherForm').serialize(),
        type: 'post',
        dataType: 'json',
        success: function (data) {
          console.log(data)
          if (data.code) {
            location.href = '/teacher/list';
          }
        }
      })
    })
  }
})
