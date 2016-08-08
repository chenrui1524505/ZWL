


var timestamp,nonceStr,signature;

var ChatConfig = Api.ApplyWeChatConfig();
if(ChatConfig && ChatConfig.Success){
   var result = ChatConfig.result;
    if(result){
        timestamp = result.SystemTime;
        nonceStr = result.nonceStr;
        signature = result.Signature;
    }

}

wx.config({
    debug: false,
    appId: 'wxc13823a96ab80a9b',
    timestamp: timestamp,
    nonceStr: nonceStr,
    signature: signature,
    jsApiList: [
        'scanQRCode'
    ]
});

wx.error(function (res) {
    mui.toast(res.errMsg+"配置出错，扫码暂时不能用！");
});


