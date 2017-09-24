define(['jquery', 'template', 'util', 'ckeditor'], function ($, template, util) {
  // 设置导航菜单选中
  util.setMenu('/course/add');
  var csId = util.qs('cs_id');
  var flag = util.qs('flag');
  $.ajax({
    url: '/api/course/basic',
    type: 'get',
    data: {
      cs_id: csId
    },
    dataType: 'json',
    success: function (data) {
      if (flag) {
        data.result.operate = '编辑课程';
      } else {
        data.result.operate = '添加课程';
      }
      var html = template('basicTpl', data.result);
      $('#basicInfo').html(html);
      $('#firstType').change(function () {
        // 
        var pid = $(this).val();
        $.ajax({
          type:'get',
          url: '/api/category/child',
          data: {
            cg_id: pid
          },
          dataType: 'json',
          success: function (data) {
            var tpl = '<option value="">请选择二级分类...</option>' +
              '{{each list}}' +
              '<option value="{{$value.cg_id}}"' +
              '>{{$value.cg_name}}</option>' +
              '{{/each}}';
            var html = template.render(tpl, { list: data.result });
            $('#secondType').html(html);
          }
        });
      });
    }
  });
});
