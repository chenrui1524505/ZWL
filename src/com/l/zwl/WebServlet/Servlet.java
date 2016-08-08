package com.l.zwl.WebServlet;


import com.l.zwl.Util.State;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * Created by Lix on 2016-7-8.
 */
public class Servlet extends HttpServlet {

    // Action后缀，如/First对应FirstAction类
    private static final String ACTION_EXT="WebAction";
    // 自定义Action处理器所在的包名
    private static final String PACKAGE_NAME="com.l.zwl.Action.";

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        request.setCharacterEncoding("UTF-8");

        String data = request.getParameter("data");

        response.setCharacterEncoding("UTF-8");
        PrintWriter pw = response.getWriter();
        JSONObject json = new JSONObject();
        String reJSON = "";

        // 根据url找到对应的action

        String uri=request.getRequestURI();
        String path=request.getContextPath();


        StringBuffer basePath = request.getRequestURL();

        String actionName=uri.substring(path.length()+1);

        String[] strs = actionName.split("/");

        String fullActionName=PACKAGE_NAME + strs[1];
        try {

            Map<String, String> params = new HashMap<String, String>();

            JSONObject jsondata =  JSONObject.fromObject(data);
            if(jsondata != null && jsondata.size() != 0) {
                Iterator it = jsondata.keys();


                while (it.hasNext()) {
                    String key = it.next().toString();
                    params.put(key, jsondata.getString(key));
                }

            }
            Class<?> ref = Class.forName(fullActionName);
            Method method = ref.getMethod(strs[2],Map.class);
            reJSON = (String)method.invoke(ref.newInstance(),params);
        }
        catch (Exception e)
        {
            System.out.println(e);
            json.put("success", State.SUCCESS_IS_FALSE);
            json.put("state", State.EXCEPTION);
            pw.println(json);
        }


        pw.println(reJSON);
        pw.flush();
        pw.close();
    }
}
