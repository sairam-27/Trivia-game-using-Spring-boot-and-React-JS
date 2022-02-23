<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="security"
	uri="http://www.springframework.org/security/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<html>
<head>
<style><%@include file="/WEB-INF/view/css/Styling.css"%></style>
<style>
.center {
	margin-left: 50px;
}
</style>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
	crossorigin="anonymous">
<link
	href="https://cdn.datatables.net/1.10.25/css/jquery.dataTables.min.css"
	rel="stylesheet">
<script src="https://code.jquery.com/jquery-3.5.1.js"></script>
<script
	src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js">
	
</script>
<script>
	$(document).ready(function() {
		$('#sidebarCollapse').on('click', function() {
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
	<div class="container">
		<div class="content">
			<h2>History</h2>
			<br>
			<table class="table table-hover table-bordered center display"
				style="width: 100%" id="tableID">
				<thead>
					<tr>
						<th>User</th>
						<th>Account Number</th>
						<th>Account Holder/UI</th>
						<th>Description</th>
						<th>Action</th>
						<th>BeforeBalance</th>
						<th>Amount</th>
						<th>AfterBalance</th>
						<th>Date of log</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach var="log" items="${logs}">
						<tr>
							<td>${log.loginUser}&nbsp;</td>
							<td>${log.accountNumber}&nbsp;</td>
							<td>${log.accountHolderName}&nbsp;</td>
							<td>${log.description}&nbsp;</td>
							<td>${log.action}&nbsp;</td>
							<td>${log.beforeBalance}&nbsp;</td>
							<td>${log.amount}&nbsp;</td>
							<td>${log.afterBalance}&nbsp;</td>
							<td>${log.actionDate}&nbsp;</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
			<script>
				$(document).ready(function() {
					$('#tableID').DataTable({
						"pagingType" : "full_numbers"
					});
				});
			</script>
		</div>
	</div>
</body>
</html>