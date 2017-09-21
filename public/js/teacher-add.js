define(['util','jquery', 'template'], function (u,$,template) {
    var tcId=u.qs('tc_id');
    if (tcId) {
      // 编辑操作
      $.ajax({
        url:'/api/teacher/edit',
        data:{
          tc_id:tcId
        },
        type:'get',
        dataType:'json',
        success:function(data){
          console.log(data)
          var html=template('teacherTpl',data.result);
          $('#teacherInfo').html(html);
        }
      })
    }else{
      // 添加操作
       var html=template('teacherTpl',{});
        $('#teacherInfo').html(html);
    }
})
