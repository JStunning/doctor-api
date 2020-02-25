export class DoctorApi {
  async fetchData() {
    try {
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?location=wa-seattle&skip=0&limit=5&user_key=${process.env.API_KEY}`;
      let response = await fetch(url);
      let jsonResponse;
      if(response.ok && response.status === 200) {
        jsonResponse = await response.json();
      } else {
        jsonResponse = false;
      }
      return jsonResponse;
    } catch(error) {
      console.log(error);
      return error;
    }
  }
}
