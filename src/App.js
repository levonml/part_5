import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	useEffect(() => {
		(async () => {
			try {
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
			setUser(user);
			user && window.localStorage.setItem("loggedUser", JSON.stringify(user));
		} catch (err) {
			console.log("login error", err);
		}
	};

	const handleLogout = () => {
		window.localStorage.clear();
		console.log("in local storsge", window.localStorage.getItem("loggedUser"));
	};
	const handleCreate = async (event) => {
		event.preventDefault();
		const newBlog = {
			title,
			author,
			url,
		};
		try {
			const receivedBlog = await blogService.create(newBlog);
			//setBlogs(blogs.concat(reseivedBlogs));
			console.log("reseived New Blog is ", receivedBlog);
		} catch (err) {
			console.log("error from getall", err);
		}
	};
	useEffect(() => {
		let loggedUser = window.localStorage.getItem("loggedUser");
		if (loggedUser) {
			loggedUser = JSON.parse(loggedUser);
			setUser(loggedUser);

			blogService.setToken(loggedUser.token);
		}
	}, []);
	console.log("useeeeeeeeeeeeer iiis", user);
	const blogsList = () => {
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
	const createNewBlog = () => (
		<form onSubmit={handleCreate}>
			<h2>create new blog</h2>
			<div>
				title :
				<input
					value={title}
					name="Title"
					onChange={({ target }) => setTitle(target.value)}
				/>
			</div>
			<div>
				author:
				<input
					value={author}
					name="Author"
					onChange={({ target }) => setAuthor(target.value)}
				/>
			</div>
			<div>
				url:
				<input
					value={url}
					name="Url"
					onChange={({ target }) => setUrl(target.value)}
				/>
			</div>
			<button type="submit" onClick={handleCreate}>
				create
			</button>
		</form>
	);

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
	return (
		<>
			<div>{createNewBlog()}</div>
			<div>{blogsList()}</div>
		</>
	);
};

export default App;
