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
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHR3wPAo2hNIeQvamJYuRZqyeMIXIXHOZ4d3KGWJ1a2Qdxh2ek",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.clowndoctors.co.uk%2Fimages%2Fclowns%2Fdr_ronald_rumtumtumich.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fandyebon.com%2Fappreciation%2Fwp-content%2Fuploads%2F2012%2F11%2Fdoctor-clown1.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fnnimgt-a.akamaihd.net%2Ftransform%2Fv1%2Fcrop%2Ffrm%2FbEHa392pg8uWfDH5RxA6T9%2F2d4a3347-4422-41c0-b023-19f3a84a32dd.jpg%2Fr0_0_5184_3456_w1200_h678_fmax.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fvignette3.wikia.nocookie.net%2Fsimpsons%2Fimages%2Fe%2Fe0%2F20160830124125%2521Clown_doctor.png%2Frevision%2Flatest%3Fcb%3D20170101223614&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.colourbox.com%2Fpreview%2F6980711-clown-young-doctor.jpg&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fphotos%2Fdoctor-clown-with-a-huge-syringe-picture-id172124183&f=1&nofb=1",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fz%2Fyoung-doctor-red-nose-singing-stethoscope-male-listening-himself-sing-wearing-clown-gray-background-33657829.jpg&f=1&nofb=1"
  ]

  let randomNum = Math.floor(Math.random() * imgUrls.length);
  return imgUrls[randomNum];
}

$(document).ready(function() {

  const newDoctor = new DoctorApi;
  $("#closest").click(async function() {
    newDoctor.resetUrl();
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

  $("#name-button").click(async function() {
    const name = $("#name").val();
    newDoctor.setNameUrl(name);
    let response = await newDoctor.fetchData();
    console.log(response.data)
    let doctorObjects = [];
    for(let i = 0; i < response.data.length; i++) {
      doctorObjects.push(
        {
          "first": response.data[i].profile.first_name,
          "last": response.data[i].profile.last_name,
          "title": response.data[i].profile.title
        }
      );
    }
    console.log(doctorObjects);
    $("#result").empty();
    doctorObjects.forEach(doctor => {
      $("#result").append(`<h3>${doctor.first} ${doctor.last}, ${doctor.title}.</h3><img src="${randomDoctorImg()}">`)
    });

  });

  $("#medical-issues-button").click(async function() {
    let medicalIssue = $("#medical-issues").val().split("");
    for(let i = 0; i < medicalIssue.length; i++){
      if(medicalIssue[i] == " "){
        medicalIssue[i] = "-";
      }
    }
    let uid = medicalIssue.join("");
    newDoctor.setMedicalIssueUrl(uid);
    let response = await newDoctor.fetchData();
    for(let i = 0; i < response.data.length; i++) {
      //console.log(response.data[i].name);
      if(response.data[i].uid === uid) {
        $("#result").empty();
        $("#result").append(`<h3>${response.data[i].uid}</h3>`)
      }
    }
  });

});
