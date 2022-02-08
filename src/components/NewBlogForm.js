import { useState } from "react";

const NewBlogForm = ({ handleCreate }) => {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [url, setUrl] = useState("");

	const handleTitleChange = ({ target }) => setTitle(target.value);
	const handleAuthorChange = ({ target }) => setAuthor(target.value);
	const handleUrlChange = ({ target }) => setUrl(target.value);
	const create = (event) => {
		event.preventDefault();
		handleCreate({ title, author, url });
		setTitle("");
		setAuthor("");
		setUrl("");
	};
	return (
		<form onSubmit={create}>
			<h2>create new blog</h2>
			<div>
				title :
				<input value={title} name="Title" onChange={handleTitleChange} />
			</div>
			<div>
				author:
				<input value={author} name="Author" onChange={handleAuthorChange} />
			</div>
			<div>
				url:
				<input value={url} name="Url" onChange={handleUrlChange} />
			</div>
			<button type="submit" onClick={create}>
				create
			</button>
		</form>
	);
};
export default NewBlogForm;
