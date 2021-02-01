package org.csu.mypetstore.web.servlets;

import com.alibaba.fastjson.JSON;
import org.csu.mypetstore.domain.Account;
import org.csu.mypetstore.service.AccountService;
import org.csu.mypetstore.service.util.Result;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class UsernameExistServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        AccountService accountService = new AccountService();
        Account result = accountService.getAccount(username);

        resp.setContentType("text/json");
        PrintWriter out = resp.getWriter();


        Result result1 = new Result();

        if(result==null){//用户名可用
            result1.setCode(0);
            result1.setMsg("Not Exist");
//            out.print("Not Exist");
        }
        else{//不可用
            result1.setCode(1);
            result1.setMsg("Exist");
//            out.print("Exist");
        }

        String str = JSON.toJSONString(result1);
        out.print(str);
        out.flush();
        out.close();
    }
}
