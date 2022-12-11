$.ajax(
  {
    url: "http://127.0.0.1:8000/my-first-api", 
    success: function(result)
    {
      console.log(result);
    },
    error: function(){
      console.log("Error Occurred")
    }
  }
);

$("#search").click(function(){
    alert("The Search was clicked.");
  });