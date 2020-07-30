$(function () {
    // 去注册账号的链接
    $('.box1').on('click', function () {
        $('.registe').hide();
        $('.sign').show();
    });
    // 去登录的链接
    $('.box2').on('click', function () {
        $('.registe').show();
        $('.sign').hide();
    })
    // 自定义校验的方法
    //  第一步 获取校验对象
    var form = layui.form;
    var layer = layui.layer;
    // 第二步 调用函数自定义规则
    form.verify({
        // 第三步 用户名校验规则
        usename: function(value, item){ //value：表单的值、item：表单的DOM对象
          if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
            return '用户名不能有特殊字符';
          }
          if(/(^\_)|(\__)|(\_+$)/.test(value)){
            return '用户名首尾不能出现下划线\'_\'';
          }
          if(/^\d+\d+\d$/.test(value)){
            return '用户名不能全为数字';
          }
        }
        // 第四步 密码框的校验规则
        ,pwd: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ]
        // 确认密码框的校验规则
        ,repwd: function (value) {
            var pwd = $('.sign [name="password"]').val();
            if (pwd !== value) {
                return '两次密码不一致'
          }
            // // 监听表单注册提交事件
       $('#form_sign').on('submit', function (e) {
        // 阻止表单提交默认行为
        e.preventDefault();
        // 发起ajax的POST请求
        $.post('http://ajax.frontend.itheima.net/api/reguser', {
            username: $('#form_sign [name="username"]').val(),
            password: $('#form_sign [name="password"]').val(),   
        },
            function (res) {
                if (res.status !== 0) {
                return layer.msg(res.message)
                }
                layer.msg('注册成功，请登录')
                // 注册完成后转入登录界面
                $('.box2').click()   
        })
    })
        }
     
    });  
    //  监听登录事件并进去后台首页
    $('#form_registe').submit(function (e) {
    //  阻止表单提交默认行为
      e.preventDefault();
      // 发起Ajax请求
      $.ajax({
        url: 'http://ajax.frontend.itheima.net/api/login',
        method: 'POST',
        // 快速获取表单中的数据
        data: $(this).serialize(),
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('登陆失败!')
          }
          layer.msg('登陆成功');
          // 将登录成功的token字符串保存到当地localStorage中
          localStorage.setItem('token',res.token)
          // 跳转到后台首页
          location.href = '/index.html';
        }
      })

    })
})