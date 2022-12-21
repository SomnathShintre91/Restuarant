// $.ajax(
//   {
//     url: "http://127.0.0.1:8000/my-first-api", 
//     success: function(result)
//     {
//       console.log(result);
//     },
//     error: function(){
//       console.log("Error Occurred")
//     }
//   }
// );

$("#search").click(function(){
  var search = $('input[name=toggle]:checked').val();
  var searchText = $('#searchText').val();
  var parm;
  if(searchText == ""){
    parm = {
      'search': search
    }
  }
  else{
    parm = {
      search: search,
      searchText: searchText
    }
  }
  $.ajax(
    {
      url: "http://127.0.0.1:8000/get-search-result", 
      dataType: "json",
      data: parm,
      success: function(result)
      {
        var newDiv = $(".row");
        newDiv.empty();
        if(result.length == 0){
          newDiv.append("<h1>No data found relate to the search!</h1>")
        }
        for(var i=0; i<result.length; i++){
          newDiv.append("<div class='col-sm-3' style='width: 18rem; height: 18rem;'>" + 
                          "<div class='card'>" + 
                            "<img class='card-img-top' src='https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000' alt='Card image cap'>" +
                            "<div class='card-body'>" +
                              "<h1 class='card-title'>"+result[i][1]+"</h1>" +
                              "<p class='card-text'>Address"+result[i][6]+"</p>" +
                              "<a href='"+result[i][8]+"' class='btn btn-primary' target='_blank'>Location</a>"+
                            "</div>" +
                          "</div>" +
                        "</div>")
        }
      },
      error: function()
      {
        console.log("Error Occurred")
      }
    }
  );
})
  