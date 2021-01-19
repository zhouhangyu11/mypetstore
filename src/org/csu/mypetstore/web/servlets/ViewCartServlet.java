package org.csu.mypetstore.web.servlets;

import org.csu.mypetstore.domain.Account;
import org.csu.mypetstore.domain.Cart;
import org.csu.mypetstore.domain.CartItem;
import org.csu.mypetstore.domain.Item;
import org.csu.mypetstore.persistence.CartItemDAO;
import org.csu.mypetstore.persistence.Impl.CartItemDAOImpl;
import org.csu.mypetstore.service.LogService;
import org.csu.mypetstore.service.CatalogService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;


public class ViewCartServlet extends HttpServlet {
    private static final String VIEW_CART = "/WEB-INF/jsp/cart/Cart.jsp";

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        CatalogService catalogService=new CatalogService();
        CartItemDAOImpl cartItemDAO = new CartItemDAOImpl();
        //Cart一个cart=session的cart（cart.jsp中25行），如果没有23-29，cart是null，而不是0，就显示不了cart。jsp中27行那句话
        HttpSession session = request.getSession();
        List<CartItem> cartList= cartItemDAO.get();

        Cart cart = new Cart();
        for(int i=0;i<cartList.size();i++){
            CartItem cartItem=cartList.get(i);
            Item item = catalogService.getItem(cartItem.getItemId());
            cart.addItem(item,true);
        }


        if(cart == null){
            cart = new Cart();
            session.setAttribute("cart", cart);
        }

        session.setAttribute("cart", cart);
        //HttpSession session = request.getSession();
        Account account = (Account)session.getAttribute("account");

        if(account != null){
            HttpServletRequest httpRequest= request;
            String strBackUrl = "http://" + request.getServerName() + ":" + request.getServerPort()
                    + httpRequest.getContextPath() + httpRequest.getServletPath() + "?" + (httpRequest.getQueryString());

            LogService logService = new LogService();
            String logInfo = logService.logInfo(" ") + strBackUrl + " 查看购物车 " + cart;
            logService.insertLogInfo(account.getUsername(), logInfo);
        }

        request.getRequestDispatcher(VIEW_CART).forward(request, response);
    }
}
