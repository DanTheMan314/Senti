function hello() {
    var  name = document.getElementById('info').value;
    alert("Hello " +name);
 }
 
 document.getElementById('btn').addEventListener('click', hello);
 //<script type="text/javascript" src="foreground.js"></script>