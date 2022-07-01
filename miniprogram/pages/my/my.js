// pages/my/my.js
const db = wx.cloud.database();//获取数据库引用
const userCollection = db.collection("user");//获取集合（collection）的引用
Page({
    /**
     * 页面的初始数据
     */
    data: {
        account:null,
        pwd:null,
      },
  //将account数据存进数据库   
//   getAccount:function(evt)
//   {
//     this.setData({account:evt.detail.value});//将数据存进data
//     console.log(this.data.account);
//   },
  //将password数据存进数据库   
//   getPwd:function(evt)
//   {
//     this.setData({pwd:evt.detail.value});//将数据存进data
//     console.log(this.data.pwd);
//   },
//将提交的 account 和 password 存入数据库
  handlerSubmit:function(evt)
  {
    console.log(evt);
    //获取用户名和密码
    let account = evt.detail.value.account;
    let pwd = evt.detail.value.pwd;  
    //  通过集合向数据库添加数据
    userCollection.add({
      data:{
        account:account,
        pwd:pwd
      }
    })
  },
  
  reg:function(evt)//注册函数
  {
    let flag = false  //表示账户是否存在,false为初始值
    this.setData({account:evt.detail.value});//将数据存进data
    this.setData({pwd:evt.detail.value});//将数据存进data
    userCollection.get({
      success: (res) => {
        let user = res.data;  //获取到的对象数组数据
        console.log(user);
        for (let i = 0; i < user.length; i++) {  //遍历数据库对象集合
          if (this.data.account === user[i].account) { //账户已存在
            flag = true;
            break;
          }
        }
        if (flag === true) {  //账户已存在
          wx.showToast({
            title: '账号已注册！',
            icon: 'error',
            duration: 2500
          })
        }
        else {  //账户未注册
          userCollection.add({
            data:{
              account:this.data.account,
              pwd:this.data.pwd
            }
          })
          wx.showToast({	//显示注册成功信息
            title: '注册成功！',
            icon: 'success',
            duration: 2500
          })
          wx.switchTab({	//注册成功后跳转页面
            // url: "/index/index"
          }) 
        }
      }
    })
  },
  login:function(evt)//登录函数
  {
    let flag = false  //表示账户是否存在,false为初始值
    userCollection.get({
      success: (res) => {
        let user = res.data;
        console.log(user);
        for (let i = 0; i < user.length; i++) {  //遍历数据库对象集合
          if (this.data.account === user[i].account) { //账户已存在
            if (this.data.pwd !== user[i].pwd) {  //判断密码正确与否
              wx.showToast({  //显示密码错误信息
                title: '密码错误！！',
                icon: 'error',
                duration: 2500
              });
              i=-1; //密码错误则重头开始遍历数据库对象集合
            } else {
              wx.showToast({  //显示登录成功信息
                title: '登陆成功！！',
                icon: 'success',
                duration: 2500
              })
              flag=true;
              wx.switchTab({  //登录成功后跳转页面
                // url: "/index/index",
              })
              break;
            }
          }
        };
        if(flag==false)//遍历完数据后发现没有该账户
        {
          wx.showToast({
            title: '该用户不存在',
            icon: 'error',
            duration: 2500
          })
        }
      }
    })
  },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      // 登录
    // wx.login({
    //     success: res => {
    //       // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //       wx.request({
    //         url: 'https://localhost:3000/api/login',
    //         method: 'POST',
    //         data: {
    //           wxCode: res.code
    //         },
    //         success: result => {
    //           console.log(result)
    //         }
    //       })
    //     }
    //   })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})