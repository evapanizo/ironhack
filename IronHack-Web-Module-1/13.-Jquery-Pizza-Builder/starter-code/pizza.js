// Write your Pizza Builder JavaScript in this file.
$(document).ready(function() {

  /// Remove default gluten free crust and white sauce
  $(".crust").removeClass("crust-gluten-free");
  $(".sauce").removeClass("sauce-white");

  /// Active button initial state
  $(".btn-crust").removeClass("active");
  $(".btn-sauce").removeClass("active");

  /// Ingredients list initial state
  $("li:contains($3 white sauce)").hide();
  $("li:contains($5 gluten-free crust)").hide();

  /// Update total price
  $("strong").text(["$13"]);

  function updateTotalPrice () {
    let totalPrice = 10;

    if($(".btn-pepperonni").hasClass("active")) {
      totalPrice += 1;
    }
    
    if($(".btn-mushrooms").hasClass("active")){
      totalPrice += 1;
    }
    
    if($(".btn-green-peppers").hasClass("active")){
      totalPrice += 1;
    }
      
    if($(".btn-sauce").hasClass("active")){
      totalPrice += 3;
    }
    
    if($(".btn-crust").hasClass("active")){
      totalPrice += 5;
    }
    
    $("strong").text(`$${totalPrice}`);
  } 

  /// Hide & show ingredients
  /// Update button active state
  /// Update ingredients list and total price
  $(".btn-pepperonni").click(function() {
    $(".pep").toggle();
    $(this).toggleClass("active");
    $("li:contains($1 pepperonni)").toggle();
    updateTotalPrice();
  });

  $(".btn-mushrooms").click(function() {
    $(".mushroom").toggle();
    $(this).toggleClass("active");
    $("li:contains($1 mushrooms)").toggle();
    updateTotalPrice();
  });

  $(".btn-green-peppers").click(function() {
    $(".green-pepper").toggle();
    $(this).toggleClass("active");
    $("li:contains($1 green peppers)").toggle();
    updateTotalPrice();
  });

  $(".btn-sauce").click(function() {
    $(".sauce").toggleClass("sauce-white");
    $(this).toggleClass("active");
    $("li:contains($3 white sauce)").toggle();
    updateTotalPrice();
  });
  
  $(".btn-crust").click(function() {
    $(".crust").toggleClass("crust-gluten-free");
    $(this).toggleClass("active");
    $("li:contains($5 gluten-free crust)").toggle();
    updateTotalPrice();
  });

});