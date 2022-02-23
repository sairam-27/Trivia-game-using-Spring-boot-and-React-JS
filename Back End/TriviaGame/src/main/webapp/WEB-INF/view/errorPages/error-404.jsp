<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="security"
	uri="http://www.springframework.org/security/tags"%>
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
	    });
	});
</script>
</head>
<body>
<div style="background-image:  url("Images/BackgroundImage.jpg"))></div>
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
	<h3>The page you are looking is not found!!</h3>
	<a class="center" href="${pageContext.request.contextPath}/"> <svg
				xmlns="http://www.w3.org/2000/svg" width="40" height="40"
				fill="currentColor" class="bi bi-box-arrow-in-left"
				viewBox="0 0 16 16">
  			<path fill-rule="evenodd"
					d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z" />
  			<path fill-rule="evenodd"
					d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z" />
		</svg> Go back to Home page!!
		</a>
</body>
</body>
</body>
</html>

