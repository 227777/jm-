// pages/listen/listen.js
let db=wx.cloud.database()
const innerAudioContext = wx.createInnerAudioContext()
Page({
    /**
     * 页面的初始数据
     */
    data: {
    list:[],
    play:false
    },
    getmusic(e)
    {
    let that=this
    db.collection("music").doc(e).get()
    .then(res=>{
        console.log(res.data)
        that.setData({
            list:res.data,
        })
        innerAudioContext.src =res.data.musicFile
     })
    },
    play()
    {
        innerAudioContext.play()
        this.setData({play:true})
    },
    pause()
    {
        innerAudioContext.pause();
        this.setData({play:false})
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
    console.log(options.id)
    this.getmusic(options.id)
    // innerAudioContext.autoplay = true //进入页面自动播放
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {
        
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {
       innerAudioContext.pause();
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})