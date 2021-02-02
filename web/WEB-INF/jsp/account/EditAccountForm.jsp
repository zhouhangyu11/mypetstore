<%@ include file="../common/IncludeTop.jsp"%>

<script>
	function validate() {
		var password = document.getElementById("password").value;
		var repeatedPassword = document.getElementById("repeatedPassword").value;

		var tips = document.getElementById("passwordTips");
		if(password==repeatedPassword){
			tips.className='okmsg';
			tips.innerText="Correct Password"
		}
		else if(password!=repeatedPassword){
			tips.className='errormsg';
			tips.innerText="Different Password!"
		}

	}
</script>

<div id="Catalog">
<form action="saveAccount" method="post">
	<h3>User Information</h3>

	<table>
		<tr>
			<td>User ID:</td>
			<td>${sessionScope.account.username}</td>
		</tr>
		<tr>
			<td>New password:</td>
			<td><input type="text" name="password" autofocus="autofocus" id="password" onkeyup="validate()"/></td>
		</tr>
		<tr>
			<td>Repeat password:</td>
			<td><input type="text" name="repeatedPassword" id="repeatedPassword" onkeyup="validate()"/>
				<span id="passwordTips"></span>
			</td>
		</tr>
	</table>
	<%@ include file="IncludeAccountFields.jsp"%>
	<input type="submit" name="editAccount" value="Save Account Information" />

</form>
	<!--event="listOrders-->
	<a href="viewListOrder?username=${sessionScope.account.username}">My Orders</a>
</div>

<%@ include file="../common/IncludeBottom.jsp"%>
