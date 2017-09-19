define(['jquery','template'],function ($,template) {
  console.log(123)
  $.ajax({
    url:'/api/teacher',
    type:'get',
    dataType:'json',
    success:function(data){
      var html=template('teacherTpl',{list:data.result});
      $('#teacherInfo').html(html); 
    }
  })
})
