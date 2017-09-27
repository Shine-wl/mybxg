require.config({
  baseUrl: '/public/assets',
  paths: {
    jquery: 'jquery/jquery',
    cookie: 'jquery-cookie/jquery.cookie',
    template: 'artTemplate/template-web',//模板引擎插件
    bootstrap: 'bootstrap/js/bootstrap',
    datepicker: 'bootstrap-datepicker/js/bootstrap-datepicker',//日期插件
    lanugare: 'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',//日期插件语言设置
    validate: 'validate/jquery-validate.min',//表单验证插件
    uploadify: 'upload/jquery.uploadify.min',//文件上传插件
    ckeditor: 'ckeditor/ckeditor', //富文本插件
    form: 'jquery-form/jquery.form',//表单提交插件
    region: 'jquery-region/jquery.region',//区域选择插件
    jcrop: 'jcrop/js/jcrop.min',//区域选择插件
    echarts: 'echarts/echarts.min',
    common: '../js/common',
    login: '../js/login',
    util: '../js/util',
    teacheradd: '../js/teacher-add',
    teacherlist: '../js/teacher-list',
    settings: '../js/settings',
    courselist: '../js/course-list',
    index: '../js/index',
    courseadd: '../js/course-add',
    coursebasic: '../js/course-basic',
    coursepicture: '../js/course-picture',
    courselesson: '../js/course-lesson',
    state: '../js/state'
  },
  shim: {
    bootstrap: {
      deps: ['jquery']
    },
    lanugare: {
      deps: ['jquery', 'datepicker']
    },
    validate: {
      deps: ['jquery']
    },
    uploadify: {
      deps: ['jquery']
    },
    ckeditor: {
      exports: 'CKEDITOR'
    },
    jcrop: {
     deps: ['jquery']
    }
  }
});
