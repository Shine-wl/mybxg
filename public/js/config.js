require.config({
  baseUrl: '/public/assets',
  paths: {
    jquery: 'jquery/jquery',
    cookie: 'jquery-cookie/jquery.cookie',
    template: 'artTemplate/template-web',
    bootstrap:'bootstrap/js/bootstrap',
    datepicker:'bootstrap-datepicker/js/bootstrap-datepicker',
    lanugare:'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
    common: '../js/common',
    login: '../js/login',
    util: '../js/util',
    teacheradd: '../js/teacher-add',
    teacherlist: '../js/teacher-list'
  },
  shim: {
    bootstrap: {
     deps: ['jquery']
    },
    lanugare: {
     deps: ['jquery','datepicker']
    }
  }
});
