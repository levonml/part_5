import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		(async () => {
			try {
				console.log("inside the f");
				const reseivedBlogs = await blogService.getAll();
				setBlogs(reseivedBlogs);
			} catch (err) {
				console.log("error from getall", err);
			}
		})();
	}, []);
	const handleLogin = async (event) => {
		event.preventDefault();
		try {
			const user = await loginService.login({ userName, password });
			setUsername("");
			setPassword("");
			user && setUser(user);
			user && window.localStorage.setItem("loggedUser", JSON.stringify(user));
		} catch (err) {
			console.log("login error", err);
		}
	};

	const handleLogout = () => {
		window.localStorage.clear();
		console.log("in local storsge", window.localStorage.getItem("loggedUser"));
	};
	useEffect(() => {
		let loggedUser = window.localStorage.getItem("loggedUser");
		if (loggedUser) {
			loggedUser = JSON.parse(loggedUser);
			setUser(loggedUser);
			console.log("logged ser isss", loggedUser);
			//blogService.setToken(user.token);
		}
	}, []);
	const blogsList = () => {
		//getBlogs();
		return (
			<div>
				<div>
					{user.username} logged-in
					<button onClick={handleLogout}>log out</button>
				</div>

				<div>
					<h2>blogs</h2>
					{blogs.map((blog) => (
						<Blog key={blog.id} blog={blog} />
					))}
				</div>
			</div>
		);
	};

	const loginForm = () => (
		<form onSubmit={handleLogin}>
			<div>
				login
				<input
					value={userName}
					name="Username"
					onChange={({ target }) => setUsername(target.value)}
				/>
			</div>
			<div>
				password
				<input
					type="password"
					value={password}
					name="Password"
					onChange={({ target }) => setPassword(target.value)}
				/>
			</div>
			<button type="submit" onClick={handleLogin}>
				login
			</button>
		</form>
	);
	if (user === null) {
		return <div>{loginForm()}</div>;
	}
	return <div>{blogsList()}</div>;
};

export default App;
