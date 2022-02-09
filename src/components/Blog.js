import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: "solid",
		borderWidth: 1,
		marginBottom: 5,
	};
	const buttonStyle = {
		margin: 10,
		background: "white",
		borderRadius: 5,
	};
	const [visible, setVisible] = useState(false);
	const [likes, setLikes] = useState(blog.likes);
	const showDetails = () => setVisible(true);
	const hideDetails = () => setVisible(false);

	const addLike = () => {
		blog.likes++;
		blogService.update(blog);
		setLikes(blog.likes);
	};

	return (
		<div style={blogStyle}>
			<div style={visible ? { display: "none" } : { display: "" }}>
				{blog.title} {blog.author}
				<button style={buttonStyle} onClick={showDetails}>
					view
				</button>
			</div>
			<div style={visible ? { display: "" } : { display: "none" }}>
				<div>
					{blog.title}
					<button style={buttonStyle} onClick={hideDetails}>
						hide
					</button>
				</div>
				<div>{blog.url}</div>
				<div>
					likes {likes}
					<button onClick={addLike} style={buttonStyle}>
						like
					</button>
				</div>
				<div>{blog.author}</div>
			</div>
		</div>
	);
};

export default Blog;
