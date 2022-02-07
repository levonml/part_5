import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
	try {
		const response = await axios.get(baseUrl);
		return response.data;
	} catch (err) {
		console.log("error from getall", err);
	}
};
let config = null;
const setToken = (token) => {
	console.log("token will beeee", token);
	config = { headers: { Authorization: `Bearer ${token}` } };
};
const create = async (newBlog) => {
	try {
		const respons = await axios.post(baseUrl, newBlog, config);
		return respons.data;
	} catch (err) {
		console.log("create error", err);
	}
};
const blogService = { getAll, setToken, create };
export default blogService;
