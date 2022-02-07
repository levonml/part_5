import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const getBlogs = async () => {
		const receivedBlogs = await blogService.getAll();
		setBlogs(receivedBlogs);
		console.log("blogs", blogs);
	};
	useEffect(() => {
		getBlogs();
	}, []);

	const handleLogin = async (event) => {
		event.preventDefault();
		const loggedUser = await loginService.login({ userName, password });
		console.log("loggeduser is", loggedUser);
		setUsername("");
		setPassword("");
		loggedUser && setUser(loggedUser);
	};
	const blogsList = () => {
		return (
			<div>
				<div>{user.username} logged-in</div>
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
