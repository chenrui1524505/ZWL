package com.l.zwl.Action;

import com.l.zwl.Util.*;
import net.sf.json.JSONObject;

import java.util.Date;
import java.util.Map;

/**
 * Created by Lix on 2016-7-20.
 */
public class Api {

    /**
     *
     * @return
     */
    public String requestApi(Map<String, String> params){

        String reJSON = "";

            if(!params.isEmpty()){
                String Authorization = params.get("Authorization");
                String url = params.get("url");
                params.remove("Authorization");
                params.remove("url");
                reJSON = WebHttp.doPost(url, params, Authorization);
            }

        return reJSON;

    }


    /**
     * 读取微信配置
     * @param params
     * @return String
     */
    public String ReaderFile(Map<String, String> params){

        return new FileUtil().ReaderFile(params.get("fileName"));
    }


    /**
     * 设置微信配置
     * @param params
     * @return
     */
    public String WriterFile(Map<String, String> params){
        return new FileUtil().WriterFile(params.get("str") , params.get("pathName"));
    }


    /**
     *
     * @param params
     * @return
     */
    public String isPastDue(Map<String, String> params){
        if(params.size() < 0){
            return State.PARAMETER_IS_ERROR;
        }
        String fr = new FileUtil().ReaderFile(params.get("fileName"));

        JSONObject frJSON = JSONObject.fromObject(fr);
        if(frJSON != null && frJSON.size() > 0){
            if(frJSON.getBoolean("Success") == true){
                JSONObject result = frJSON.getJSONObject("result");
                if(result != null && result.size() > 0){
                    String expireDateStr = result.getString("expireDateStr");

                    if(expireDateStr != null && !"".equals(expireDateStr)){
                        long expireDate = new Date(expireDateStr).getTime();
                        if(expireDate - System.currentTimeMillis() > 0){
                            return fr;
                        }else{
                            return State.RESULT_IS_NULL;
                        }
                    }else{
                        return State.RESULT_IS_NULL;
                    }
                }
            }
        }

        return State.RESULT_IS_NULL;
    }



    /**
     * 更新微信配置信息  并且将结果存放到文件中
     * @param params
     * @return
     */
    public String ApplyWeChatConfig(Map<String, String> params){

        if(params.size() < 0){
            return State.PARAMETER_IS_ERROR;
        }
        WeChatApi wechatapi = new WeChatApi();
        String rf = new Api().isPastDue(params);

        if(rf != null && !"".equals(rf)){

            JSONObject ticketSON = null;


            JSONObject rfJSON = JSONObject.fromObject(rf);
            if(rfJSON != null && rfJSON.size() > 0){

                if(rfJSON.getBoolean("Success") == true){

                    ticketSON = rfJSON.getJSONObject("result");

                }else{


                    String tokens = wechatapi.getToken();

                    JSONObject tokensJSON = JSONObject.fromObject(tokens);

                    if(tokensJSON != null && tokensJSON.size() > 0){

                        String access_token = tokensJSON.getString("access_token");

                        if(access_token != null && !"".equals(access_token)){

                            String Ticket = wechatapi.getTicket(access_token);

                            JSONObject TicketJSON = JSONObject.fromObject(Ticket);

                            if(TicketJSON != null && TicketJSON.size() > 0 ) {

                                if(TicketJSON.getBoolean("Success") == true) {

                                    String wf = new FileUtil().WriterFile(TicketJSON.getJSONObject("result").toString(), params.get("fileName"));

                                    if (wf != null && !"".equals(wf)) {

                                        JSONObject wfJSON = JSONObject.fromObject(wf);

                                        if (wfJSON != null && wfJSON.size() > 0) {

                                            if (wfJSON.getBoolean("Success") == true) {

                                                ticketSON = wfJSON.getJSONObject("result");

                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }

            if (ticketSON != null && ticketSON.size() > 0) {

                String ticket = ticketSON.getString("ticket");

                String WeChatConfig = wechatapi.getSignature(ticket,params.get("configUrl"));

                return WeChatConfig;

            }


        }

        return State.RESULT_IS_NULL;
    }





}
