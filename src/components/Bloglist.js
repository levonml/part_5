import Blog from "./Blog";

const handleLogout = () => {
	window.localStorage.clear();
};
const Bloglist = ({ user, blogs }) => (
	<div>
		<form onSubmit={handleLogout}>
			<div>{user.username} logged-in</div>
			<div>
				<button type="submit" onClick={handleLogout}>
					log out
				</button>
			</div>
		</form>

		<div>
			<h2>blogs</h2>
			{blogs.map((blog) => (
				<Blog key={blog.id} blog={blog} />
			))}
		</div>
	</div>
);
export default Bloglist;
