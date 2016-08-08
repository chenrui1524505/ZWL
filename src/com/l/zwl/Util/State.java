package com.l.zwl.Util;

/**
 * Created by Lix on 2016-7-21.
 */
public class State {

    public static final Boolean SUCCESS_IS_FALSE            = false;
    public static final Boolean SUCCESS_IS_TRUE             = true;
    public static final String PARAMETER_IS_NULL            = "PARAMETER_IS_NULL";//参数为空
    public static final String FILE_IS_NULL                 = "FILE_IS_NULL"; //文件不存;
    public static final String RESULT_IS_NULL               = "{\"Success\":\"false\",\"state\":\"RESULT_IS_NULL\"}"; //结果为空不存;
    public static final String EXCEPTION                    = "EXCEPTION"; //发生异常;
    public static final String PARAMETER_IS_ERROR           = "{\"Success\":\"false\",\"state\":\"PARAMETER_IS_ERROR\"}"; //参数格式有问题;
    public static final String WRITER_FILE_EXCEPTION        = "WRITER_FILE_EXCEPTION";

}
