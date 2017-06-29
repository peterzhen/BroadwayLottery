const expandButton = document.getElementById("expand-popup");

expandButton.onclick = () => {
  document.getElementById("hiddenDiv").innerHTML = "";
  document.body.style.width = "100px";
  document.getElementsByTagName("html")[0].style.width = "100px";
};
