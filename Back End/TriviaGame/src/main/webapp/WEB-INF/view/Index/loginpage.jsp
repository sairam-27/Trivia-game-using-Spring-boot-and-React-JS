<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>


<html>
<head>
<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
	crossorigin="anonymous">
<style><%@include file="/WEB-INF/view/css/Styling.css"%></style>
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
	<br><br>
	<div class="container">
		<div class="card ">
			<div class="card-header">
				<h3>Sign In</h3>
			</div>
			<div class="card-body">
				<form:form action="${pageContext.request.contextPath}/authenticate"
					method="POST">

					<c:if test="${param.logout!=null }">
						<div class="input-group form-group error">You are logged
							out!!</div>
					</c:if>

					<c:if test="${param.error!=null }">
						<div class="input-group form-group error">Invalid username
							and password.</div>
					</c:if>
					
					<c:if test="${not empty message}">
						<h5 class="success-message">"${message}"</h5>	
					</c:if>
					
					<div class="input-group form-group">
						<div class="input-group">
							<span class="input-group-addon"><i
								class="glyphicon glyphicon-user"></i></span> <input type="text"
								class="form-control" name="username" placeholder="Username">
						</div>
					</div>
					<br>
					<div class="input-group form-group">
						<div class="input-group">
							<span class="input-group-addon"><i
								class="glyphicon glyphicon-lock"></i></span> <input type="password"
								class="form-control" name="password" placeholder="password">
						</div>
					</div>
					<br>
					<div class="form-group">
						<input type="submit" value="Login"
							class="btn float-right login_btn">
					</div>
				</form:form>
			</div>
		</div>
		<br><br>
		<a href="${pageContext.request.contextPath}/register">Sign Up!</a>
	</div>

</body>
</html>