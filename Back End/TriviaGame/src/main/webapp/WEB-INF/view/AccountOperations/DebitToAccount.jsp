<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="security"
	uri="http://www.springframework.org/security/tags"%>
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
		$("#debitButton").click(function() {
			$("#debit").slideToggle();
		});

	});
</script>
</head>

<body class="d-flex flex-column min-vh-100">

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
	<div style="position: absolute; left: 50%; top: 190px">
		<button id="debitButton" style="width: 250px;"
			class="btn btn-outline-success">Debit from account</button>
		<div id="debit" style="display: none">
			<br>
			<form action="${pageContext.request.contextPath}/accounts/debit"
				method="GET">
				From Account: <input type="text" class="form-control"
					placeholder="From Account" name="AccountNumber"
					id="debitAccountNumber" /><br> Amount: <input type="text"
					class="form-control" placeholder="Amount" name="Amount"
					id="debitAmount" /><br> <input
					class="form-control btn btn-outline-primary" type="submit"
					value="Debit">
			</form>
		</div>
		<c:if test="${not empty message}">
			<h5 class="success-message top">"${message}"</h5>	
		</c:if>
	</div>
</body>
</html>

