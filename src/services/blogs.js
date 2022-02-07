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

const blogService = { getAll };
export default blogService;
