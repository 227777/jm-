let db=wx.cloud.database()
const innerAudioContext = wx.createInnerAudioContext()
let number=0
//云开发本地数据库增删改查固定写法  wx.cloud.database().collection
Page({
    /**
     * 页面的初始数据
     */
    data: {
         list:[],   
         listShow:[],  //下方播放数组
         searchList:[],  //搜索数组
         play:false,
         searchShow:true,
    },
//获取音乐
getmusic()
{
    let that=this//这里使this转为全局变量
    db.collection("music").get()
    .then(res=>{
      innerAudioContext.src=res.data[0].musicFile
      that.setData({
          list:res.data,
          listShow:res.data[0]
      })
    })
},
//点击跳转到播放音乐
listen(e)
{
    console.log(e);
    let id=e.currentTarget.dataset.id
    this.setData({play:false})
    innerAudioContext.pause()
    wx.navigateTo({
    url:'/pages/listen/listen?id='+id
})
},
//play
play()
{
    innerAudioContext.play()
    this.setData({play:true})
},
pause()
{
    innerAudioContext.pause()
    this.setData({play:false})
},
// 选择音乐添加列表
choose(e)
{
    console.log(e)
    let that =this
    number=e.currentTarget.dataset.number
    // let id=e.currentTarget.dataset._id
    innerAudioContext.src=e.currentTarget.dataset.item.musicFile
    innerAudioContext.play()
    that.setData({
        listShow:e.currentTarget.dataset.item,
        play:true
    })
},
// 搜索的音乐进行播放
searchChoose(e)
{
    console.log(e)
    let that =this
    number=e.currentTarget.dataset.number
    // let id=e.currentTarget.dataset._id
    innerAudioContext.src=e.currentTarget.dataset.item.musicFile
    innerAudioContext.play()
    that.setData({
        listShow:e.currentTarget.dataset.item,
        play:true
    })
},
// 下一首
nextMusic(){
    innerAudioContext.autoplay=true
    if(number<this.data.list.length)
    {
        number++
    }
 if(number<this.data.list.length)
 {
    let that = this
    innerAudioContext.src=that.data.list[number].musicFile
    that.setData({
        listShow:that.data.list[number],
        play:true
    })
 }
 else if(number==this.data.list.length)
 {
     wx.showToast({
         title:"已经是最后一首了",
         icon:"none"
     })
     number--
 }
//  console.log(number)
},
// 上一首
lastMusic(){
    innerAudioContext.autoplay=true
    if(number==0)
    {
        wx.showToast({
            title:"已经是第一首了",
            icon:"none"
        })
    }
    else
    {
        number--
        let that = this
        innerAudioContext.src=that.data.list[number].musicFile
        that.setData({
            listShow:that.data.list[number],
            play:true
        })
    }
},
//模糊搜索？
onSearch(e)
{
    let that=this
    let inputValue=e.detail
    let num1=0
    for(let i=0;i<this.data.list.length;i++)
    {
        if(this.data.list[i].name.indexOf(inputValue)>=0||this.data.list[i].musicName.indexOf(inputValue)>=0)
        {             
            that.setData({
                searchList:that.data.searchList.concat(that.data.list[i]),             
                searchShow:false,
            })        
        }else
        {
            // that.setData({list:null})
        }
    }
    if(!inputValue||inputValue===" ")
    {
        that.setData({searchShow:false})
        wx.showToast({
            title:'没有搜索结果',
            icon:'none'
        })
    }
},
inputFocus(e)
{
    let that =this
    that.setData({
        searchList:[],
        searchShow:true
    })
    console.log(e)
},
//unload搜索页 返回主页面
onCancel(e)
{
    let that =this
    that.setData({
    searchShow:true
    })
},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.getmusic()
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
      innerAudioContext.pause();
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