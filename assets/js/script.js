var search = function(event) {
    console.log($("#city").val());
    $("#current-city").html($("#city").val());
    
}
$("#search-button").on("click", search);
