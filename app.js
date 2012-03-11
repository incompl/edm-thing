(function() {

  $.each(window.genres, function() {
    $("#genres").append($("<div>", this));
  });

  $(".genre").each(function() {
    var hue = Math.random() * 255;
    $(this).html("<div class='name'>" + $(this).attr("id") + "</div>")
    .append("<a href='#' class='play'>play<a>")
    .css("background-color", "hsla(" + hue + ", 100%, 20%, .7)")
    .css("border-color", "hsla(" + hue + ", 100%, 40%, 1)")
    .css("color", "hsla(" + hue + ", 100%, 90%, 1)");
  });

  $(".genre").on("click", function(e) {
    e.preventDefault();
    var $genre = $(this).closest(".genre");
    var v = $genre.data("v");
    var name = $genre.attr("id");
    $("#video-header").text(name);
    $("#video-desc").text($genre.data("desc") || "");
    $("#video-aka").text($genre.data("aka") ? "aka " + $genre.data("aka") : "");
    if (!v) {
      $("#video-wrapper").text("No example for " + name + " yet. I'm lazy");
    }
    else {
      $("#video-wrapper").html('<iframe id="youtubes" width="420" height="315" src="http://www.youtube.com/embed/' + v + '?rel=0&autoplay=1" frameborder="0" allowfullscreen></iframe>');
    }
    $("#modal").show();
  });

  $("#close-modal").on("click", function(e) {
    e.preventDefault();
    $("#youtubes").remove();
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