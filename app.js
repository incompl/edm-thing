(function() {

  $(".genre").each(function() {
    $(this).html("<div class='name'>" + $(this).attr("id") + "</div>")
    .append("<a href='#' class='play'>play<a>")
    .css("background-color", "hsla(" + (Math.random() * 255) + ", 100%, 20%, 1)");
  });

  $(".play").on("click", function(e) {
    e.preventDefault();
    var v = $(this).closest(".genre").data("v");
    if (!v) {
      $("#video-wrapper").text("No example for this yet. I'm lazy");
    }
    else {
      $("#video-wrapper").html('<iframe width="420" height="315" src="http://www.youtube.com/embed/' + v + '?rel=0" frameborder="0" allowfullscreen></iframe>');
    }
    $("#modal").show();
  });

  $("#close-modal").on("click", function(e) {
    e.preventDefault();
    $("#modal").hide();
  })

  $("#genres").isotope({
    itemSelector : '.genre',
    layoutMode : 'fitRows'
  });

  $("#controls *").on("change", function() {

    var selector = "";

    if ($("#filter").is(":checked")) {

      $("#filters").show("fast");

      var bpm = Number($("#bpm").val());
      if (bpm < 90) selector += ".slow";
      else if (bpm < 130) selector += ".mid";
      else selector += ".fast";

      var breakbeat = $("#break").get(0).checked;
      if (breakbeat) selector += ".break";
      else selector += ".straight";
    }
    else {
      $("#filters").hide("fast");
    }

    $("#genres").isotope({ filter: selector });

  });

  $(".control").eq(0).change();

})();