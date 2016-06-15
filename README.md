to setup testing environment run npm install   

then run yo jasmine


to import labels, go on you label page on github and copy paste this code in the console

var labels = [];
[].slice.call(document.querySelectorAll(".label-link"))
.forEach(function(element) {
  labels.push({
    name: element.textContent.trim(),
    // using style.backgroundColor might returns "rgb(...)"
    color: element.getAttribute("style")
      .replace("background-color:", "")
      .replace(/color:.*/,"")
      .trim()
      // github wants hex code only without # or ;
      .replace(/^#/, "")
      .replace(/;$/, "")
      .trim(),
  })
})
console.log(JSON.stringify(labels, null, 2))


this will outout to console a json file save the output in your local repo. 
then run: 
labels -c path/to/conf.json user/repo 
