<%@ include file="../common/IncludeTop.jsp"%>

${sessionScope.messageAccount}

<div id="Catalog">
	<form action="newAccount" method="post">
		<h3>User Information</h3>

		<table>
			<tr>
				<td>User ID:</td>
				<td><input type="text" name="username" id="username" onblur="usernameIsExist();"/></td>
				<td><span id="isExistInfo"></span></td>
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

<%--	<script>--%>
<%--		var xhr;--%>
<%--		function usernameIsExist() {--%>
<%--			var username = document.getElementById('username').value;--%>
<%--			xhr=new XMLHttpRequest();--%>
<%--			xhr.onreadystatechange=process;--%>
<%--			xhr.open("GET","usernameIsExist?username="+username,true);--%>
<%--			xhr.send(null);--%>
<%--		}--%>
<%--		function process() {--%>
<%--			if(xhr.readyState==4){--%>
<%--				if(xhr.status==200){--%>
<%--					var responseInfo = xhr.responseText;--%>
<%--					var msg = document.getElementById('isExistInfo');--%>
<%--					if(responseInfo=='Exist'){--%>
<%--						msg.classList.add('okmsg');--%>
<%--						msg.innerText='用户名可用';--%>
<%--					}--%>
<%--					else if(responseInfo=='Not Exist'){--%>
<%--						msg.classList.add('errormsg');--%>
<%--						msg.innerText='用户名不可用';--%>
<%--					}--%>
<%--				}--%>
<%--			}--%>
<%--		}--%>
<%--	</script>--%>
</div>


<%@ include file="../common/IncludeBottom.jsp"%>