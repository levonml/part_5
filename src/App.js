import React, { useState, useEffect, useRef } from "react";

import blogService from "./services/blogs";
import loginService from "./services/login";
import Error from "./components/Error";
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import Togglable from "./components/Togglable";
import LoginForm from "./components/LoginForm";
import Bloglist from "./components/Bloglist";

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
	const [notification, setNotification] = useState(null);

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

	const handleLogin = async (obj) => {
		try {
			const user = await loginService.login(obj, setError);
			user && setUser(user);
			user && window.localStorage.setItem("loggedUser", JSON.stringify(user));
		} catch (err) {
			console.log("login error", err);
		}
		noteFormRef.current.handleShow();
	};
	useEffect(() => {
		let loggedUser = window.localStorage.getItem("loggedUser");
		if (loggedUser) {
			loggedUser = JSON.parse(loggedUser);
			setUser(loggedUser);
			console.log("loggedUser.token===========", loggedUser.token);
			blogService.setToken(loggedUser.token);
		}
	}, []);

	const handleCreate = async (newBlog) => {
		try {
			const receivedBlog = await blogService.create(newBlog);
			if (receivedBlog) {
				setBlogs(blogs.concat(receivedBlog));
			}
			setNotification(
				`new blog ${receivedBlog.title} added by ${receivedBlog.author}`
			);
			setTimeout(() => setNotification(null), 3000);
		} catch (err) {
			console.log("error from getall", err);
		}
		noteFormRef.current.handleShow();
	};
	const noteFormRef = useRef();
	const createNewBlog = () => (
		<Togglable buttonLable="create new blog" ref={noteFormRef}>
			<NewBlogForm handleCreate={handleCreate} />
		</Togglable>
	);

	const loginForm = () => (
		<Togglable buttonLable="login">
			<LoginForm handleLogin={handleLogin} />
		</Togglable>
	);
	if (user === null) {
		return (
			<>
				<Error message={error} />
				<div>{loginForm()}</div>
			</>
		);
	}
	return (
		<>
			<Notification message={notification} />
			<div>{createNewBlog()}</div>
			<Bloglist user={user} blogs={blogs} />
		</>
	);
};

export default App;
