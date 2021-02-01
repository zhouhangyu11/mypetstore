package org.csu.mypetstore.web.servlets;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import org.csu.mypetstore.domain.Product;
import org.csu.mypetstore.service.CatalogService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class AutoCompleteServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String keyword = req.getParameter("keyword");//获取关键字

        CatalogService catalogService = new CatalogService();
        List<Product>productList = catalogService.searchProductList(keyword);//获取产品列表

        resp.setContentType("application/json;charset=uft-8");
        JSONArray searchArray = new JSONArray();
        for(int i=0;i<productList.size();i++){
            JSONObject searchObject = new JSONObject();
            searchObject.put("name",productList.get(i).getName());//产品名字
            searchArray.add(searchObject);
        }

        String searchString = searchArray.toJSONString();//转换为JSON字符串

        PrintWriter out = resp.getWriter();
        out.print(searchString);

        out.flush();
        out.close();
    }
}
