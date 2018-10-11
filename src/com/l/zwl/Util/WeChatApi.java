package com.l.zwl.Util;

import net.sf.json.JSONObject;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Lix on 2016-7-21.
 */
public class WeChatApi {

    private static final String AppID = "wxdd532663f8343d52";
    private static final String AppSecret = "6afff4a0c4484cdb30044c63fa0aa7cc";
    private static final String grant_type = "client_credential";

    /**
     * 获取access_token
     * @return String
     */
    public String getToken(){

        String url ="https://api.weixin.qq.com/cgi-bin/token";
        Map<String ,String> params= new HashMap<String,String>();
        params.put("grant_type", grant_type);
        params.put("appid", AppID);
        params.put("secret", AppSecret);
        String str = WebHttp.doPost(url, params , null);

        return str;

    }

    //https://api.weixin.qq.com/cgi-bin/ticket/getticket

    /**
     * getticket
     * @return String
     */
    public String getTicket(String token){

        String str = null;
        JSONObject resultJSON = new JSONObject();
        resultJSON.put("Success",State.SUCCESS_IS_FALSE);

        if(token != null && !token.isEmpty()){
            long SystemTime = System.currentTimeMillis();
            String url ="https://api.weixin.qq.com/cgi-bin/ticket/getticket";
            Map<String ,String> params= new HashMap<String,String>();
            params.put("access_token", token);
            params.put("type", "jsapi");
            str = WebHttp.doPost(url, params , null);

            JSONObject strJSON = JSONObject.fromObject(str);


            if(strJSON != null && strJSON.size() > 0){
                Date d = new Date(SystemTime);
                Calendar c = Calendar.getInstance();
                c.setTime(d);
                c.add(Calendar.MINUTE, strJSON.getInt("expires_in") / 60);

                Date expireDate = new Date(c.getTimeInMillis());
                String expireDateStr = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss").format(expireDate).toString();
                strJSON.put("expireDateStr",expireDateStr);
                resultJSON.put("Success",State.SUCCESS_IS_TRUE);
                resultJSON.put("result",strJSON);

                return resultJSON.toString();

            }

        }

        return resultJSON.toString();
    }

    /**
     *
     * @return
     */
    public String getSignature(String jsapi_ticket ,  String url ){

        String nonceStr = Galaxy.getInstance().getRandomString(16);

        long SystemTime = System.currentTimeMillis();
        String key = "jsapi_ticket="+jsapi_ticket+"&noncestr="+nonceStr+"&timestamp="+SystemTime+"&url="+url;

        String Signature = "";
        try {
            Signature = SHA.encryptSHA(key);
        } catch (Exception e) {
            e.printStackTrace();
        }

        JSONObject re = new JSONObject();
        if(!"".equals(Signature)){

            JSONObject json = new JSONObject();


            json.put("Signature",Signature);
            json.put("nonceStr",nonceStr);
            json.put("SystemTime",SystemTime);
            json.put("AppID",AppID);

            re.put("Success",State.SUCCESS_IS_TRUE);
            re.put("result",json);

            return re.toString();
        }

        return State.RESULT_IS_NULL;
    }


    public static void main(String[] arg){

        WeChatApi wechatapi = new WeChatApi();

        String tokens = wechatapi.getToken();

        JSONObject tokensJSON = JSONObject.fromObject(tokens);

        if(tokensJSON.size() > 0){
            String access_token = tokensJSON.getString("access_token");
            if(access_token != null && !access_token.isEmpty()){
                String Ticket = wechatapi.getTicket(access_token);
                JSONObject TicketJSON = JSONObject.fromObject(Ticket);
                if(TicketJSON.size() > 0) {
                    String ticket = TicketJSON.getString("ticket");
                    String expires = TicketJSON.getString("expires_in");
                    if (ticket != null && !"".equals(ticket)) {
                        String nonceStr = Galaxy.getInstance().getRandomString(16);
                        wechatapi.getSignature(ticket,"");
                    }
                }
            }
        }
    }

}
