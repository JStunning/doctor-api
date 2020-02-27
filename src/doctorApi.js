export class DoctorApi {
  constructor(){
    this.url = `https://api.betterdoctor.com/2016-03-01/doctors?location=wa-seattle&skip=0&limit=5&user_key=${process.env.API_KEY}`;

  }

  setNameUrl(userInput){
    this.url = `https://api.betterdoctor.com/2016-03-01/doctors?name=${userInput}&location=wa-seattle&skip=0&limit=5&user_key=${process.env.API_KEY}`;
    console.log(this.url);
  }

  setMedicalIssueUrl(query){
    this.url = `https://api.betterdoctor.com/2016-03-01/doctors?query=${query}&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=${process.env.API_KEY}`;
    console.log(this.url);
    console.log(this.fetchData(this.url))
  }

  resetUrl(){
    this.url = `https://api.betterdoctor.com/2016-03-01/doctors?location=wa-seattle&skip=0&limit=5&user_key=${process.env.API_KEY}`;
  }

  async fetchData() {
    try {
      let response = await fetch(this.url);
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
