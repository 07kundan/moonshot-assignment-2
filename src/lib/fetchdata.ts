import axios from "axios";

async function fetchData() {
  try {
    const response = await axios.get(
      "https://script.google.com/macros/s/AKfycbzyTwiZ5GsWLE7Ryx4e8ZTwefSc_nBM_-fGmouzHRXoG9zTgvsM3994N44zecDTVdzW/exec"
    );

    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export default fetchData;
