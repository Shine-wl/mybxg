<?php 
  // 根据url返回相应的页面就是路由
  header('content-type:text/html; charset=utf8;');
  // var_dump($_SERVER)
  //默认路径名称
  $dir = 'main';
  //默认文件名称
  $filename = 'index';
  //处理url中的路径，证明PATH_INFO在不在 $_SERVER里面
  if (array_key_exists('PATH_INFO', $_SERVER)) {
      //路径存在
      //请求路径
    $path=$_SERVER['PATH_INFO'];// /main/index
      //截取字符串
      //第一个参数字符串
      //第二个参数截取字符串的位置
    $str = substr($path, 1); //main/index
    $ret = explode('/', $str); //返回值是数组
    //判断数组长度
    if (count($ret) == 2) {
      // 两层路径
      //覆盖默认路径
      $dir = $ret[0];
      //覆盖文件名称
      $filename = $ret[1];
     } else {
      //其他情况统一跳转到登录页
      $filename = 'login';
     }
  }
  // echo $path
  // 根据url中的路径返回相应的页面
  include('./views/'.$dir.'/'.$filename.'.html');

 ?>
