var baseUrl = "http://127.0.0.1:8000/"

$("#search").click(async function(){
  var search = $('input[name=toggle]:checked').val();
  var searchText = $('#searchText').val();
  var parm;
  var cardDiv = $("#cards");
  cardDiv.empty();
  if(searchText == ""){
    cardDiv.append("<h1>Search is empty!</h1>")
    return
  }
  else{
    parm = {
      search: search,
      searchText: searchText
    }
  }

  try{
    var result = await apiCall("get-search-result", parm);
    cardDiv.empty();
    if(result.length == 0){
      cardDiv.append("<h1>No data found relate to the search!</h1>")
    }
    else{
      await displayCard(cardDiv, result);
      await initializeFilter(search, searchText, parm)
    }
  } catch(err) {
    console.log(err);
  }

});
  
var apiCall = function(url, parm){
  return $.ajax(
    {
      url: baseUrl+url, 
      dataType: "json",
      traditional: true,
      data: parm
    }
  );
}

var initializeFilter = async function(search, searchText, parm) {
  var filter = $("#filter");
  $("#filterbar").css({ visibility: 'visible' })

  try{
    var result = await apiCall("get-filter", parm);
    var filterDiv = $("#filter");
    filterDiv.empty();
    if(result.length <= 1){
      return;
    }
    else{
      await displayFilter(filterDiv, result);
    }
    
  } catch(err) {
    console.log(err);
  }
};

var displayCard = async function(cardDiv, result) { 
  for(var i=0; i<result.length; i++){
    cardDiv.append("<div class='col-3 m-3' style=''>" + 
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
};

var displayFilter = async function(filterDiv, result) { 
  for(var i=0; i<result.length; i++){
    filterDiv.append("<div class='form-check form-check-inline'>" + 
                    "<input class='form-check-input' type='radio' name='inlineRadioOptions' id='inlineRadio1' value='"+result[i]+"'>"+
                    "<label class='form-check-label' for='inlineRadio1'>"+result[i]+"</label>"+
                    "</div>")
  }
};

$('#filter').on('change','input[name=inlineRadioOptions]:checked', async function(){
  var value = $(this).val();
  var search = $('input[name=toggle]:checked').val();
  var searchText = $('#searchText').val();
  var parm;
  var cardDiv = $("#cards");

  parm = {
    search: search,
    searchText: searchText,
    filterList: value
  }
  try{
    var result = await apiCall("get-filter-result", parm);
    cardDiv.empty();
    if(result.length == 0){
      cardDiv.append("<h1>No data found relate to the search!</h1>")
    }
    else{
      await displayCard(cardDiv, result);
    }
  } catch(err) {
    console.log(err);
  }
});
