package org.csu.mypetstore.persistence;

import java.sql.*;

public class DBUtil {
    //这个类是完成数据库连接的
    private static  String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    private static  String DB_URL = "jdbc:mysql://localhost:3306/mypetstore?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
    private static String username = "root";
    private static String password = "15137616898zhou";

    //获取连接
    public static Connection getConnection() throws Exception{
        Connection conn = null;
        try {
            Class.forName(JDBC_DRIVER);
            System.out.println("连接数据库...");
            conn = DriverManager.getConnection(DB_URL, username, password);
            System.out.println("数据库连接成功");//表示数据库连接成功
        }
        catch (Exception e){
            throw e;
        }
        return conn;
    }

    public static void closeStatement(Statement statement) throws Exception{
        statement.close();
    }

    public static void closePreparedStatment(PreparedStatement preparedStatement) throws Exception{
        preparedStatement.close();
    }

    public static void closeResultSet(ResultSet resultSet) throws Exception{
        resultSet.close();
    }

    public static void closeConnection(Connection connection) throws Exception{
        connection.close();
    }

    /*test the db connection
    public static void main(String[] args) throws Exception{
        Connection conn = DBUtil.getConnection();
        System.out.println(conn);
    }
    */
}
