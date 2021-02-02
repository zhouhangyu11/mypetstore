<%@ include file="../common/IncludeTop.jsp"%>

${sessionScope.messageAccount}

<script>
	$(function () {
		$('#username').on('blur',function () {
			$.ajax({
				type      :"GET",
				url       :"usernameExist?username="+this.value,
				success   :function (data) {

					// console.log(data);
					// console.log(data.code);

					if(data.msg==='Exist'){
						$('#usernameTips').attr("class","errormsg").text('Invalid');
					}else if(data.msg==='Not Exist'){
						$('#usernameTips').attr("class","okmsg").text('Available');
					}
				}
			});
		});
	});

</script>
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
	<form action="newAccount" method="post">
		<h3>User Information</h3>

		<table>
			<tr>
				<td>User ID:</td>
				<td>
                    <input type="text" name="username" id="username" >
                    <span id="usernameTips"></span>
                </td>
			</tr>
			<tr>
				<td>New password:</td>
				<td><input type="text" name="password" id="password" onkeyup="validate()"/></td>
			</tr>
			<tr>
				<td>Repeat password:</td>
				<td><input type="text" name="repeatedPassword" id="repeatedPassword" onkeyup="validate()"/>
					<span id="passwordTips"></span>
				</td>
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