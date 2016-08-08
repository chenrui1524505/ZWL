package com.l.zwl.Util;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.params.HttpMethodParams;

/**
 * Created by Lix on 2016-7-8.
 */
public class WebHttp {

    public static String doPost(String url,Map<String,String> params , String Authorization){
        try {
            HttpClient client = new HttpClient();

            PostMethod method = new PostMethod(url);
            if(Authorization != null){
                method.addRequestHeader("Authorization", Authorization);
            }

            if(params != null && !params.isEmpty()){
                for(Map.Entry<String,String> entry : params.entrySet()){
                    String value = entry.getValue();
                    if(value != null){
                        ((PostMethod) method).addParameter(entry.getKey(),value);
                    }
                }
            }

            HttpMethodParams param = method.getParams();
            param.setContentCharset("UTF-8");

            client.executeMethod(method);
            InputStream stream = method.getResponseBodyAsStream();

            BufferedReader br = new BufferedReader(new InputStreamReader(stream, "UTF-8"));
            StringBuffer buf = new StringBuffer();
            String line;
            while (null != (line = br.readLine())) {
                buf.append(line).append("\n");
            }
            //System.out.println(buf.toString());
            //释放连接
            method.releaseConnection();

            return buf.toString();
        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }
    public static void main(String[] args) {

        String url ="http://123.57.222.123:9901/reservation/addReservationBychoose";
        Map<String ,String> params= new HashMap<String,String>();
        params.put("userInfoId", "46313");
        params.put("seatId", "46846");
        params.put("reservationBeginTime", "2016-07-10 12:30:00");
        params.put("reservationEndTime", "2016-07-11 13:30:00");
        params.put("notArrive", "1");

        String Authorization = "Bearer 3ba5f619661ef53d282db5dfd39b03d8e459668acb6cbb7b6182c1c29f023945da3d5d30d845f223d1142b0897d6f39653784abec30fe3891435c3ea555f30c98fb232a57ab989524e547bb0ec9f90fb1f0292822785ce8a8c1d03b737285a52715583e37324ce59fca43647ef15b15d9e3ed97efdce8494e15dec9d245608e7a7e446d62f37a596e85ab6d46e27e213acba10a89d6a4af24dce0b3760c05f39f0ff6e4858d96765c7a8d987484366fcfffcb4fbdb00c28f0bbf9182eef66c5c4df642253965d9d429f118aa31935d4bc4263a090b6abb62185e6aad02606f770fcbd69701fc9cdb06494de0e6ce789b0d6e9d4e389256e9c86c024efe88deca90ffe3b0097acd6e6e46ffd8deaf9ea23390a32e22323460496a9035278d479d164b82f20d07e74afea46129deefee658696150c1829d658060a30fb6d2bd9fbc57e7daed7476dee66de286e8a31ab418034724c034f8f75e784663ced1186dd11b20e5ffe2744bf345f9774bc7f5b7e8d7a42e2cef10d545c17fbdc8bbf748a0ec299cf2b36f6404301b2eaecd20d92e5e92ce7d305d94ce0e16d3aebac352e823f7483840ccd712cde8dc35a4e9db9617abde735403c31914032176b41894d3221d28d6ed775cc3d06203779ada3933aea1bf59197d1dcd9d87bc12fd36d8b6f84688812229d00f4499fd2a5a1d60fa0cf6840c8e8d561ffeb775779847be4";

        String str = WebHttp.doPost(url, params , Authorization);

    }
}
