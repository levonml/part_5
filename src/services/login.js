import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
	try {
		console.log("credentials", credentials);
		const response = await axios.post(baseUrl, credentials);
		console.log("response.data", response.data);
		return response.data;
	} catch (err) {
		console.log("error from login", err);
	}
};
//const setToken = (token) => {};
const loginService = { login };
export default loginService;
