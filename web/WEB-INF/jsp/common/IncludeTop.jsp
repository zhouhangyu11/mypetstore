<%--
  Created by IntelliJ IDEA.
  User: Summer
  Date: 2018/12/10
  Time: 15:24
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>

<html xmlns="http://www.w3.org/1999/xhtml">



<head>
    <link rel="StyleSheet" href="css/jpetstore.css" type="text/css" media="screen" />

    <meta name="generator" content="HTML Tidy for Linux/x86 (vers 1st November 2002), see www.w3.org" />
    <title>MyPetStore</title>
    <meta content="text/html; charset=windows-1252" http-equiv="Content-Type" />
    <meta http-equiv="Cache-Control" content="max-age=0" />
    <meta http-equiv="Cache-Control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="Expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="Pragma" content="no-cache" />

    <script type="text/javascript" src="js/jquery-3.5.1.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="css/jquery-ui.min.css" type="text/css" />
</head>

<body>

<script>
    $().ready(function () {
        var $keyword = $("#keyword");
        $keyword.on("keyup",function () {
            var text = $keyword.val();
            console.log("输入框为"+$keyword.val());

            if(text==''){//如果输入框为空不输出
                // console.log("搜索框为空")
            }else{//如果不为空则从数据库中寻找结果
                $.ajax({
                    type:"GET",
                    url:"autoComplete",
                    data:{"keyword":$keyword.val()},
                    dataType:"json",
                    success:function (data) {
                        if(typeof (data)=='string'){
                            var stringObj = function (data) {
                                return eval("("+data+")");
                            }
                            alert(stringObj);
                            console.log(stringObj);
                        }
                        var searchResult = new Array();
                        for(var i=0;i<data.length;i++){
                            searchResult[i]=data[i].name;
                            // console.log(searchResult[i]);
                        }
                        $keyword.autocomplete({
                           source:searchResult
                        });
                    }
                })
            }
        });
    });
</script>

<div id="Header">

    <div id="Logo">
        <div id="LogoContent">
            <a href="main"><img src="images/logo-topbar.gif" /></a>
        </div>
    </div>

    <div id="Menu">
        <div id="MenuContent">
            <!--购物车-->
            <a href="viewCart"><img align="middle" name="img_cart" src="images/cart.gif" /></a>
            <img align="middle" src="images/separator.gif" />
            <c:if test="${sessionScope.account == null}">
                <a href="signOnForm">Sign In</a>
            </c:if>
            <c:if test="${sessionScope.account != null}">
                <a href="signOff">Sign Out</a>
                <!---signOff-->
            </c:if>

            <!--分隔符-->
            <c:if test="${sessionScope.account != null}">
                <img align="middle" src="images/separator.gif" />
                <a href="editAccount">My Account</a>
            </c:if>
            <img align="middle" src="images/separator.gif" />
            <!--暂未提供-->
            <a href="../help.html">?</a>
        </div>
    </div>

    <div id="Search">
        <div id="SearchContent">
            <!--搜索栏目-->
            <form action="searchProduct" method="post">
                <input type="text" name="keyword" size="14" id="keyword"/>
                <input type="submit" name="searchProducts" value="Search" id="searchProducts"/>
            </form>
        </div>
    </div>

    <div id="QuickLinks">
        <a href="viewCategory?categoryId=FISH"><img src="images/sm_fish.gif" /></a>
        <img src="images/separator.gif" />
        <a href="viewCategory?categoryId=DOGS"><img src="images/sm_dogs.gif" /></a>
        <img src="images/separator.gif" />
        <a href="viewCategory?categoryId=REPTILES"><img src="images/sm_reptiles.gif" /></a>
        <img src="images/separator.gif" />
        <a href="viewCategory?categoryId=CATS"><img src="images/sm_cats.gif" /></a>
        <img src="images/separator.gif" />
        <a href="viewCategory?categoryId=BIRDS"><img src="images/sm_birds.gif" /></a>
    </div>
</div>

<div id="Content">
