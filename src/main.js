import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import $ from "jquery";
import { fetchData } from "./doctorApi";

$(document).ready(function() {
  const url = "https://api.betterdoctor.com/2020-02-21";
  fetchData(url);
});
