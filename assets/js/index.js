$(function () {
    // 调用这个函数获取用户数据
    getUserInfo();

    var layer = layui.layer;
    // 点击退出按钮返回登录页面
    $('#btnLogout').on('click', function () {
        // 提示用户是否退出
        layer.confirm('你确定退出登录？', { icon: 3, title: '提示' },
            // 若是确定退出
            function (index) {
        //   首先清除本地储存中的token
                localStorage.removeItem('token');
                // 跳转到登录页面
                location.href = '/login.html'
                // 同时关闭confirm询问框
                layer.close(index);
          });
    })
   
})
// 获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败!')
            }
            // 成功之后渲染用户头像
            renderAvatar(res.data)
        },
        
    })
    
}
// 渲染用户名头像函数
function renderAvatar(user) {
    // 获取用户名称
    var name = user.nickname || user.username;
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 按需要渲染用户的头像
    if (user.user_pic !== null) {
        // 当user_pic不为空时，渲染用户上传的图片
        $('.layui-nav-img').attr('src', user.user_pic).show();
        // 隐藏文本的头像
        $('.text-avatar').hide();
    } else {
        // 否则显示文本头像
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
        // 隐藏上传图片
        $('.layui-nav-img').hide()
        
    }
}