module.exports = {

	routes : {

		users: "api/users",
		login: "api/users/login",
		logout: "api/users/logout",
		roles: "api/roles",
        permissions: "api/roles/:role/permissions"
	}
}
