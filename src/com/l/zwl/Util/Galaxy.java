package com.l.zwl.Util;

import net.sf.json.JSONObject;

import java.util.Random;

/**
 * Created by Lix on 2016-7-21.
 */
public class Galaxy {

    public static Galaxy instance = new Galaxy();

    public static Galaxy getInstance() {
        return instance;
    }

    public static String getRandomString(int length) { //length表示生成字符串的长度
        String base = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random random = new Random();
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < length; i++) {
            int number = random.nextInt(base.length());
            sb.append(base.charAt(number));
        }
        return sb.toString();
    }

}
