<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />

<html>
<head>
<style><%@include file="/WEB-INF/view/css/Styling.css"%></style>
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
	crossorigin="anonymous">
<script>
	$(document).ready(function() {
		$('#sidebarCollapse').on('click', function () {
	        $('#sidebar').toggleClass('active');
	        $('.container').toggleClass('active');
	    });
	});
</script>
</head>
<body>
	<nav class="navbar navbar-expand-lg navbar-light"
		style="background-color: #e3f2fd; position: sticky; top: 0;">
		<div class="container-fluid">
 			<img width="30" height="30" style="margin-right: 10px; " src="https://img.icons8.com/ios/200/000000/menu--v6.png" 
		id="sidebarCollapse"/>
			<a class="nav-link" href="${pageContext.request.contextPath}/">The Bank</a>
			<div class="collapse navbar-collapse" id="navbarSupportedContent">
				<ul class="navbar-nav me-auto ">
					<li class="nav-item"><a class="nav-link "
						aria-current="page" href="${pageContext.request.contextPath}/">Home</a>
					</li>
					<li class="nav-item"><security:authorize
							access="hasRole('ADMIN')">
							<a class="nav-link"	
								href="${pageContext.request.contextPath}/adminDashboard/getUserList">Administrator
								dashboard</a>
						</security:authorize></li>
					<li class="nav-item"><security:authorize
							access="hasRole('ADMIN') or hasRole('USER')"><a class="nav-link"
						href="${pageContext.request.contextPath}/history/list">History</a></security:authorize>
					</li>

				</ul>
				<ul class="navbar-nav ms-auto">
					<security:authorize access="isAnonymous()">
						<li class="nav-item"><a class="nav-link"
							href="${pageContext.request.contextPath}/login">Login</a></li>
					</security:authorize>
					<security:authorize access="!isAnonymous()">
						<li class="nav-item"><a class="nav-link"
							href="${pageContext.request.contextPath}/logout">Logout</a>
					</security:authorize>
					<li class="nav-item"><a class="nav-link"
						href="${pageContext.request.contextPath}/register">Register</a></li>
				</ul>
			</div>
		</div>
	</nav>
	
	<div class="wrapper">
		<nav id="sidebar">
			<!-- <a class="main link" href="#">The Bank</a> -->
			<ul class="list-unstyled components">
				<li><a href="${pageContext.request.contextPath}/accounts/creditAccount" class="link">Credit</a></li>
				<li><a href="${pageContext.request.contextPath}/accounts/debitAccount" class="link">Debit</a></li>
				<li><a href="${pageContext.request.contextPath}/accounts/transferFunds" class="link">Transfer</a></li>
				<li><a href="${pageContext.request.contextPath}/accounts/createAccount" class="link">Create Account</a></li>
			</ul>
		</nav>
		
	</div>		
	<br>
	<br>
	<div class="container content"
		style="height: 100%;">
		<form:form method="POST" modelAttribute="user" class="form-signin"
			action="${pageContext.request.contextPath}/registration"
			id="register">
			<form:hidden path="id" />
			<h2 class="form-signin-heading ">Create a user</h2>
			<%-- 			<spring:bind path="firstName">
	 --%>
			<div class="form-group w-25">
				<form:input type="text" path="firstName" class="form-control"
					placeholder="FirstName" autofocus="true"></form:input>
				<form:errors path="firstName" class="errorMessage"></form:errors>
			</div>
			<%-- 			</spring:bind>
	 --%>
			<br>
			<div class="form-group w-25">
				<form:input type="text" path="lastName" class="form-control"
					placeholder="LastName" autofocus="true"></form:input>
				<form:errors path="lastName" class="errorMessage"></form:errors>
			</div>
			<br>
			<div class="form-group w-25">
				<form:input type="text" path="username" class="form-control"
					placeholder="Username" autofocus="true"></form:input>
				<form:errors path="username" class="errorMessage"></form:errors>
			</div>
			<br>
			<div
				class="form-group w-25<%--  ${status.error ? 'has-error' : ''} --%>">
				<form:input type="password" path="password" class="form-control"
					placeholder="Password"></form:input>
				<form:errors path="password" class="errorMessage"></form:errors>
			</div>
			<br>
			<div class="form-group w-25">
				<form:textarea rows="10" cols="60" path="address"
					placeholder="Enter your address"></form:textarea>
				<form:errors path="address" class="errorMessage"></form:errors>
			</div>
			<br>
			<div class="form-group w-25">
				<form:select path="bank" class="form-control">
					<form:option value="SBI"></form:option>
					<form:option value="HDFC"></form:option>
				</form:select>
				<form:errors path="bank" class="errorMessage"></form:errors>
			</div>
			<br>
			<%-- <div class="form-group w-25">
						<form:select path="accountType" class="form-control">
							<form:option value="Savings"></form:option>
							<form:option value="Current"></form:option>
						</form:select>  
						<form:errors path="accountType" class="errorMessage"></form:errors>
					</div> --%>
			<div>
			<%-- 	<security:authorize
								access="hasRole('ADMIN')"> --%>
					<br>
					<h4>Roles:</h4>
					<input type="checkbox" name="User" value="ROLE_USER" />&ensp;User<br>
					<input type="checkbox" name="Admin" value="ROLE_ADMIN" />&ensp;Admin<br>
				<%-- </security:authorize> --%>
			</div>
			<br>
			<button class="btn btn-lg btn-primary btn-block" type="submit">Submit</button>
		</form:form>
	</div>


	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script src="${contextPath}/resources/js/bootstrap.min.js"></script>

</body>
</html>