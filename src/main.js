import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import $ from "jquery";
import { DoctorApi } from './doctorApi';

function randomDoctorImg(){
  const imgUrls = [
    "https://2.bp.blogspot.com/_0BEbMTrc3UQ/R7GhuaVlYFI/AAAAAAAACLQ/Mo5L6riJYrg/s400/CLOWN%20Doctor.jpg",
    "https://i2-prod.chroniclelive.co.uk/incoming/article7657517.ece/ALTERNATES/s615/JS44457622.jpg",
    "https://previews.123rf.com/images/elnur/elnur1704/elnur170400314/75085259-funny-clown-doctor-isolated-on-the-white-background.jpg",
    "https://image.shutterstock.com/image-photo/funny-doctor-wearing-clown-outfit-260nw-1034623450.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQTSCud2mStzTLAIXaMtvneD9qhoFS0sUC36674ovm9rJ-w7bjJ",
    "https://www.thewrap.com/sites/default/wp-content/uploads/files/corddry_childrens.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHR3wPAo2hNIeQvamJYuRZqyeMIXIXHOZ4d3KGWJ1a2Qdxh2ek"
  ]

  let randomNum = Math.floor(Math.random() * 7);
  return imgUrls[randomNum];
}

$(document).ready(function() {

  const newDoctor = new DoctorApi;
  $("#button").click(async function() {
    let response = await newDoctor.fetchData();
    console.log(response.data)
    let doctorObjects = [];
    for(let i = 0; i < response.data.length; i++) {
      doctorObjects.push(
        {
          "first": response.data[i].profile.first_name,
          "last": response.data[i].profile.last_name,
          "title": response.data[i].profile.title,
          "bio": response.data[i].profile.bio,
          "location": {
            "city": response.data[i].practices[0].visit_address.city,
            "state": response.data[i].practices[0].visit_address.state,
            "street": response.data[i].practices[0].visit_address.street,
            "zip": response.data[i].practices[0].visit_address.zip,
          }
        }
      );
    }
    console.log(doctorObjects);
    $("#result").empty();
    doctorObjects.forEach(doctor => {
      $("#result").append(`<h3>${doctor.first} ${doctor.last}, ${doctor.title}.</h3><img src="${randomDoctorImg()}">
      <h5>Doctor's Office: ${doctor.location.city}, ${doctor.location.state}, ${doctor.location.street}, ${doctor.location.zip}</h5><p>${doctor.bio}</p>`);
    })
  });

});
