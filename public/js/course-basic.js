define(['jquery', 'template', 'util','validate','form','ckeditor'], function ($, template, util) {
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
    //编辑和添加课程界面的共享
    success: function (data) {
      if (flag) {
        data.result.operate = '编辑课程';
      } else {
        data.result.operate = '添加课程';
      }
      var html = template('basicTpl', data.result);
      $('#basicInfo').html(html);

      //根据以及分类的id查询所有的二级分类的数据
      $('#firstType').change(function () {    
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
      //处理表单提交
      $('#basicForm').validate({
        sendForm:false,
        valid:function(){
          $(this).ajaxSubmit({
            url:'/api/course/update/basic',
            type:'POST',
            dataType:'json',
            data:{
              cs_id:csId
            },
            success:function(data){
              // 下一步跳转到封面裁切界面
              location.href='/course/picture?cs_id='+data.result.cs_id;
            }

          });
        }
      })
    }
  });
});
