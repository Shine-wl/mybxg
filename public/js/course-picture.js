define(['jquery','template','util','uploadify'],function ($,template,util) {
  // 设置导航菜单选中
  util.setMenu('/course/add');
  var csId=util.qs('cs_id');
  $.ajax({
    url:'/api/course/picture',
    type:'get',
    dataType:'json',
    data:{
      cs_id:csId
    },
    success:function(data){
      var html = template('pictureTpl',data.result);
      $('#pictureInfo').html(html);
      // 上传图片处理
      $('#myfile').uploadify({
        width:80,
        height:'auto',
        buttonText:'选择图片',
        itemTemplate:'<span></span>',
        buttonClass:'btn btn-success btn-sm',
        swf:'/public/assets/upload/uploadify.swf',
        fileObjName:'cs_cover_original',
        uploader:'/api/uploader/cover',
        formData:{cs_id:csId},
        onUploadSuccess:function(a,b){
          var obj=JSON.parse(b)
          $('.preview img').attr('src',obj.result.path);
        }
      })
    }
  })
})
