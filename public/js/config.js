require.config({
  baseUrl: '/public/assets',
  paths: {
    jquery: 'jquery/jquery.min',
    cookie: 'jquery-cookie/jquery.cookie',
    template: 'artTemplate/template-web',
    bootstrap:'bootstrap/js/bootstrap',
    common: '../js/common',
    login: '../js/login',
    util: '../js/util',
    teacheradd: '../js/teacher-add',
    teacherlist: '../js/teacher-list'
  },
  shim: {
    bootstrap: {
     deps: ['jquery']
    }
  }
});
