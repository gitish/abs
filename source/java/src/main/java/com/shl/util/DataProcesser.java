package com.shl.util;

import java.util.HashMap;
import java.util.Map;

public class DataProcesser {
    /*
     * Private constructor to avoid instantiation
     */
    private DataProcesser() {

    }

    /*
     * Early initialisation to avoid synchronisation
     */
    public static final String DR_INFO = "DR-INFO";
    public static final String PATIENT_INFO= "PATIENT-INFO";
    public static final String LOCATION = "LOCATION";
    private static DataProcesser _dataProcesser = null;
    private static Map<String, String> dataMap = new HashMap<String, String>();
    public static final String STATUS = "STATUS";

    /*
     * initialize the
     */
    public static DataProcesser getInstance() {
        if (_dataProcesser == null) {
            synchronized (DataProcesser.class) {
                if (_dataProcesser == null) {
                    _dataProcesser = new DataProcesser();
                    init();
                }
            }
        }
        return _dataProcesser;
    }

    private static void init() {
        dataMap.put(DR_INFO, "Dr. A,M.S.,Spine\n"+ "Dr. C,M.D.,Physician");
        dataMap.put(PATIENT_INFO, "Patient1,Patient2");
        dataMap.put(LOCATION, "Bhagalpur,Banka,Gagdispur");
        dataMap.put(STATUS, "Active");
    }

    public String getData(String key) {
        return dataMap.get(key);
    }

    public void setData(String key, String data) {
        dataMap.put(key, data);
    }

}
