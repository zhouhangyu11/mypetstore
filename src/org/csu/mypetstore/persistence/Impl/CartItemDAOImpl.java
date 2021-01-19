package org.csu.mypetstore.persistence.Impl;
import org.csu.mypetstore.domain.CartItem;
import org.csu.mypetstore.domain.Item;
import org.csu.mypetstore.domain.Product;
import org.csu.mypetstore.persistence.DBUtil;
import org.csu.mypetstore.persistence.CartItemDAO;
import org.csu.mypetstore.service.CatalogService;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class CartItemDAOImpl implements CartItemDAO {
    private static final String insertCartString = "INSERT INTO CART (ITEMID, PRODUCTID, DESCRIPTION, INSTOCK, QUANTITY, PRICE, TOTAL) VALUES(?, ?, ?, ?, ?, ?, ?)";
    private static final String removeString="delete from cart where itemId = ?";
    private static final String setQuantity="UPDATE cart SET quantity = ?, total = ? WHERE itemId = ?";
    private static final String getCart="select * from cart";
    private final String SELECT = "select * from cart where itemId = ?";

    private CatalogService catalogService;

    public void insertCart(CartItem cartItem){
        try{
            Connection connection = DBUtil.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(insertCartString);
            preparedStatement.setString(1, cartItem.getItemId() );
            preparedStatement.setString(2, cartItem.getProductId());
            preparedStatement.setString(3, cartItem.getDescription());
            preparedStatement.setInt(4, cartItem.getInstock());
            preparedStatement.setInt(5, cartItem.getQuantity());
            preparedStatement.setFloat(6, cartItem.getPrice());
            preparedStatement.setFloat(7, cartItem.getTotal1());

            preparedStatement.executeUpdate();
            DBUtil.closePreparedStatment(preparedStatement);
            DBUtil.closeConnection(connection);
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public List<CartItem> get(){
        List<CartItem> cartList=new ArrayList<CartItem>();
        try{
            Connection connection = DBUtil.getConnection();
            PreparedStatement preparedStatement = connection.prepareStatement(getCart);
            ResultSet resultSet = preparedStatement.executeQuery();
            while(resultSet.next()){
                CartItem cartItem =new CartItem();

                cartItem.setItemId(resultSet.getString(1));
                cartItem.setProductId(resultSet.getString(2));
                cartItem.setDescription(resultSet.getString(3));
                cartItem.setInstock(resultSet.getInt(4));
                cartItem.setQuantity(resultSet.getInt(5));
                cartItem.setPrice(resultSet.getFloat(6));
                cartItem.setTotal(resultSet.getFloat(7));

                cartList.add(cartItem);
            }
            DBUtil.closeResultSet(resultSet);
            DBUtil.closePreparedStatment(preparedStatement);
            DBUtil.closeConnection(connection);
        }catch (Exception e){
            e.printStackTrace();
        }
        return cartList;
    }

    public void removeItemById(String itemId){
        try{
            Connection connection=DBUtil.getConnection();
            PreparedStatement preparedStatement=connection.prepareStatement(removeString);
            System.out.println(itemId);
            preparedStatement.setString(1,itemId);
            preparedStatement.execute();
            DBUtil.closePreparedStatment(preparedStatement);
            DBUtil.closeConnection(connection);

        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public void update(String itemId,int quantity,float total){
        try{
            Connection connection=DBUtil.getConnection();
            PreparedStatement preparedStatement=connection.prepareStatement(setQuantity);
            preparedStatement.setInt(1,quantity);
            preparedStatement.setFloat(2,total);
            preparedStatement.setString(3,itemId);
            preparedStatement.execute();

            DBUtil.closePreparedStatment(preparedStatement);
            DBUtil.closeConnection(connection);

        }catch (Exception e){
            e.printStackTrace();
        }
    }



}
