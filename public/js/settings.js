define(['jquery', 'template','ckeditor','uploadify','region','datepicker','lanugare'], function ($, template,CKEDITOR) {
  $.ajax({
    url: '/api/teacher/profile',
    type: 'get',
    dataType: 'json',
    success: function (data) {
      if (data.code == 200) {
        var html = template('settingTpl', data.result);
        $('#settingsInfo').html(html);
        // 头像上传
        $('#upfile').uploadify({
          width: 120, //设置插件宽度
          height: 120,//高度
          buttonText:'',//设置显示文字
          itemTemplate:'<span></span>',//设置进度条
          swf: '/public/assets/upload/uploadify.swf', //设置swf路径
          uploader: '/api/uploader/avatar',//设置请求地址
          fileObjName: 'tc_avatar', //上传请求的名字，后端用此请求上传的文件，可以理解为请求参数
          onUploadSuccess: function (a, b) {//上传成功要做的是，b是后端返回的数据
            var obj=JSON.parse(b)
            $('.preview img').attr('src',obj.result.path)
          }
        })
        // 省市县三级联动设置
        $('#pcd').region({
          url:'/public/assets/jquery-region/region.json'
        })
        //处理富文本
        CKEDITOR.replace('ckeditor',{
          toolbarGroups : [
            { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
            { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
            { name: 'styles', groups: [ 'styles' ] },
            { name: 'colors', groups: [ 'colors' ] },
            { name: 'about', groups: [ 'about' ] }
          ]
        });

      }
    }
  })
})
