// app.js
App({
  onLaunch: function () {
   if(!wx.cloud)
   {
     console.error('请使用2.2.3以上');
   }else
   {
     wx.cloud.init({
       env:'music-1gzf7qihc57085d6',//云开发的环境id
       traceUser:true
     })
   }
}
});
