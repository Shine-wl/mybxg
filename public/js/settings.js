define(['jquery','template'],function ($,template) {
  $.ajax({
    url:'/api/teacher/profile',
    type:'get',
    dataType:'json',
    success:function(data){
      if (data.code==200) {
        var html=template('settingTpl',data.result);
        $('#settingsInfo').html(html); 
      }
    }
  })
})
