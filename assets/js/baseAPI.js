// 注意：每次调用 $.get() 或 $.post() 或 $.ajax()
// 的时候，会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 再发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // 统一有权限的借口，设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 不管成功与否，最终都会调用complete回掉函数
    options.complete = function (res) {
        console.log(res);
        
        // 在回掉函数中可以拿到服务器响应回来的数据
        // 根据拿回来的数据判断是否满足条件
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 若是满足条件则强制清空本地储存
            localStorage.removeItem('token')
            // 使其返回登录页面
            location.href = "/login.html"
        }
    }

})