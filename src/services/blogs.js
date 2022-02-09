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
const update = async (obj) => {
	const id = obj.id;
	const newObj = {
		title: obj.title,
		author: obj.author,
		url: obj.url,
		likes: obj.likes,
	};
	console.log("obj", obj);
	try {
		const response = await axios.put(`${baseUrl}/${id}`, newObj);
		return response.data;
	} catch (err) {
		console.log("error from getall", err);
	}
};
const blogService = { getAll, setToken, create, update };
export default blogService;
