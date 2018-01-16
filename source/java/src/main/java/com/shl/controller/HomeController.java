package com.shl.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.shl.util.DataProcesser;

@Controller
public class HomeController {
    DataProcesser dp = DataProcesser.getInstance();

    @RequestMapping("/admin")
    public ModelAndView admin() {
        ModelAndView mav = new ModelAndView("admin");
        mav.addObject("dr", readFromDataFile(DataProcesser.DR_INFO).replaceAll("\n", " <br/> "));
        mav.addObject("patient", readFromDataFile(DataProcesser.PATIENT_INFO).replaceAll("\n", " <br/> "));
        mav.addObject("location", readFromDataFile(DataProcesser.LOCATION).replaceAll("\n", " <br/> "));
        mav.addObject("status", readFromDataFile(DataProcesser.STATUS).replaceAll("\n", " <br/> "));
        return mav;
    }

    @RequestMapping("/abs/application/version")
    public @ResponseBody Map appConfig() {
        Map<String, Object> versionInfo = new HashMap<String, Object>();
        versionInfo.put("isNewFeature", true);
        versionInfo.put("accreditionFlag", "false");
        versionInfo.put("build-date", "16-01-2018");
        versionInfo.put("TimeStamp", "timeStamp");
        return versionInfo;
    }

    @RequestMapping("/greeting")
    public String greeting(@RequestParam(value = "name", required = false, defaultValue = "World") String name,
            Model model) {
        model.addAttribute("name", name);
        return "greeting";
    }

    @RequestMapping("/submit")
    String result(@RequestParam("key") String key, @RequestParam("input") String value) {
        System.out.println("I got " + key + " = " + value);
        dp.setData(key, value);
        return "result";
    }
    

    @RequestMapping("/route")
    public @ResponseBody String setRoute() {

        return "";
    }

    private String readFromDataFile(String key) {
        return dp.getData(key);
    }

}
