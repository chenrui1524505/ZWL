package com.l.zwl.Util;


import net.sf.json.JSON;
import net.sf.json.JSONObject;

import java.io.*;

/**
 * Created by Lix on 2016-7-20.
 */
public class FileUtil {

    private final static String path = new FileUtil().getClass().getResource("/").getFile().toString()+"jsonFile/";

    public static String getFilePath(){
        return path;
    }

    /**
     * 写文件
     * @param str
     * @param fileName /wechatAccess_token.json
     * @return boolean
     */
    public String WriterFile (String str , String fileName){
        JSONObject json = new JSONObject();
        json.put("Success",State.SUCCESS_IS_FALSE);

        JSONObject strJSON = JSONObject.fromObject(str);
        if(str == null || fileName == null || str.isEmpty() || fileName.isEmpty() || strJSON == null || strJSON.size() == 0){
            json.put("state",State.PARAMETER_IS_NULL);
            return json.toString();
        }
        try {
            File file = new File(path);
            if (!file.exists() && !file.isDirectory()){
                file.mkdirs();
            }
            FileWriter fw =  new FileWriter(path+fileName,false);
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(str);
            bw.flush();
            bw.close();
            json.put("Success",State.SUCCESS_IS_TRUE);
            json.put("result",strJSON);

        } catch (IOException e) {
            json.put("state",State.WRITER_FILE_EXCEPTION);
            return json.toString();
        }
        return json.toString();
    }

    /**
     * 读文件
     * @param fileName
     * @return String
     */
    public String ReaderFile(String fileName){


        JSONObject json = new JSONObject();
        json.put("Success",State.SUCCESS_IS_FALSE);

        if(fileName == null || fileName.isEmpty()){
            json.put("state",State.PARAMETER_IS_NULL);
            return json.toString();
        }

        StringBuffer buffer = new StringBuffer();
        try {

            String filePath = path+fileName;
            File file=new File(filePath);
            if(!file.exists()){
                json.put("state",State.FILE_IS_NULL);
                return json.toString();
            }
            FileReader fr = new FileReader(filePath);

            String s;
            BufferedReader br = new BufferedReader(fr);
            while(null !=  (s = br.readLine())){
                buffer.append(s);
            }
            json.put("Success",State.SUCCESS_IS_TRUE);
            json.put("result",buffer.toString());
            br.close();
            fr.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
            json.put("state",State.EXCEPTION);
            return json.toString();
        } catch (IOException e) {
            e.printStackTrace();
            json.put("state",State.EXCEPTION);
            return json.toString();
        }


        return json.toString();

    }






    public static void main(String[] arg){
        new FileUtil().WriterFile("asdfaaaaaaaaaaaaaaaaaaaaaaaaaaasdfaaaaaaaaaaaaaaaaaaaaaaaaaaasdfaaaaaaaaaaaaaaaaaaaaaaaaaaasdfaaaaaaaaaaaaaaaaaaaaaaaaaaasdfaaaaaaaaaaaaaaaaaaaaaaaaaa","adfdfddfd.txt");
        new FileUtil().ReaderFile("adfdfddfd.txt");
    }
}
