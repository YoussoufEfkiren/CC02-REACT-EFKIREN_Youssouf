import axios from "axios";

export default async function  FetchLivres() {

  return  await axios.get("https://gahi-said.com/apis/auteurs.php").then((res) => res.data);
  
}