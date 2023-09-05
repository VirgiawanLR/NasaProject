import axios from "axios";
const URL_API = "http://localhost:8000/api";

async function httpGetPlanets() {
  const response = await axios.get(`${URL_API}/planets`);
  return response.data;
}

async function httpGetLaunches() {
  const response = await axios.get(`${URL_API}/launches`);
  return response.data;
}

async function httpSubmitLaunch(launch) {
  try {
    await axios.post(`${URL_API}/launches`, launch);
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
}

async function httpAbortLaunch(id) {
  try {
    await axios.delete(`${URL_API}/launches/${id}`);
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
