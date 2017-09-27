define(['jquery', 'template', 'util', 'uploadify', 'jcrop','form'], function ($, template, util) {
  // 设置导航菜单选中
  util.setMenu('/course/add');
  var csId = util.qs('cs_id');

  //请求页面数据
  $.ajax({
    url: '/api/course/picture',
    type: 'get',
    dataType: 'json',
    data: {
      cs_id: csId
    },
    success: function (data) {

      var html = template('pictureTpl', data.result);
      $('#pictureInfo').html(html);
      // 上传图片处理
      $('#myfile').uploadify({
        width: 80,
        height: 'auto',
        buttonText: '选择图片',
        itemTemplate: '<span></span>',
        buttonClass: 'btn btn-success btn-sm',
        swf: '/public/assets/upload/uploadify.swf',
        fileObjName: 'cs_cover_original',
        uploader: '/api/uploader/cover',
        formData: { cs_id: csId },
        onUploadSuccess: function (a, b) {
          var obj = JSON.parse(b)
          $('.preview img').attr('src', obj.result.path);
          // 上传头像成功 裁切后保存
          $('#cropBtn').text('保存图片').attr('data-flag', true);
          cropImage();
        }
      });

      //获取图片
      var img = $('.preview img');
      var nowCrop=null; //保证裁切实例的唯一性
      // 设置裁剪保存按钮功能
      $('#cropBtn').click(function () {
        var flag = $(this).attr('data-flag');
        // 存在这个属性就发送数据，提交页面
        if (flag) {
          //第二次点击按钮 提交页面
          $('#cropForm').ajaxSubmit({
            type:'post',
            dataType:'json',
            url:'/api/course/update/picture',
            data:{cs_id:csId},
            success:function(data){
              location.href='/course/lesson?cs_id='+data.result.cs_id;
            }
          })
          // 不存在就改变按钮状态，并添加flag属性
        } else {
          //第一次点击按钮
          $(this).text('保存图片').attr('data-flag', true);
          cropImage();
        }
      });
      //封装一个独立的方法裁剪图片
      function cropImage() {
        img.Jcrop({
          aspectRatio: 2
        }, function () {
          nowCrop && nowCrop.destroy(); //销毁当前实例
          nowCrop=this; //作用防止调用两次出现两个实例
          // 设置 将缩略框显示出来
          $('.thumb').html('');
          this.initComponent('Thumbnailer', { width: 240, height: 120, mythumb: '.thumb' });
          $('.jcrop-thumb').css({
            left:0,
            top:0
          })
          //获取图片的宽度和高度
          var width = this.ui.stage.width;
          var height = this.ui.stage.height;
          var x = 0;
          var y = (height - width / 2) / 2;
          var w = width;
          var h = width / 2;
          //创建一个选区
          this.newSelection();
          this.setSelect([x, y, w, h]);

          img.parent().on('cropastart cropmove cropend', function (a, b, c) {
            // 获取表单input
            var aInput=$('#cropForm').find('input');
            // 向input中添加内容 将选区变化时得到的数据填充到表单内，用来提交给后台，完成裁剪
            aInput.eq(0).val(c.x);
            aInput.eq(1).val(c.y);
            aInput.eq(2).val(c.w);
            aInput.eq(3).val(c.h);
          });
        });
      }
    }
  });
})
