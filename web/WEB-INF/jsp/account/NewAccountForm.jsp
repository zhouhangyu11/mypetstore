<%@ include file="../common/IncludeTop.jsp"%>

${sessionScope.messageAccount}

<script>
    var xhr;
    function checkUsername() {
        var username = document.getElementById("username").value;
        xhr=new XMLHttpRequest();
        xhr.onreadystatechange=fun1;
        xhr.open("GET","usernameExist?username="+username,true);
        xhr.send(null);
    }
    function fun1() {
        if(xhr.readyState===4){
            if(xhr.status===200){
                var tips = document.getElementById("usrrnameTips");
                var responseInfo = xhr.responseText;
                if(responseInfo==='Exist'){//用户名存在
                    tips.className = 'errormsg';
                    tips.innerText = "Unavailable"
                }
                else if(responseInfo=='Not Exist'){//用户名不存在
                    tips.className = 'okmsg';
                    tips.innerText = "Available"
                }
            }
        }
    }
</script>

<div id="Catalog">
	<form action="newAccount" method="post">
		<h3>User Information</h3>

		<table>
			<tr>
				<td>User ID:</td>
				<td>
                    <input type="text" name="username" id="username" onblur="checkUsername();"/>
                    <span id="usrrnameTips"></span>
                </td>
			</tr>
			<tr>
				<td>New password:</td>
				<td><input type="text" name="password" /></td>
			</tr>
			<tr>
				<td>Repeat password:</td>
				<td><input type="text" name="repeatedPassword" /></td>
			</tr>
			<tr>
				<td>VerificationCode:</td>
				<td>
					<input type="text" name="vCode" size="5" maxlength="4"/>
					<a href="newAccount"><img border="0" src="verificationCode" name="checkcode"></a>
				</td>
			</tr>
		</table>

		<%@ include file="IncludeAccountFields.jsp"%>
		<input type="submit" name="newAccount" value="Save Account Information" />
	</form>


</div>


<%@ include file="../common/IncludeBottom.jsp"%>