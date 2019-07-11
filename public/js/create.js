$(function() {
  $("#create-form").on("submit", function(event) {
    console.log("I was pressed");
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/api/potlucks",
      data: {
        name: $("input[name=eventName]")
          .val()
          .trim(),
        admin: "Becca",
        time: $("#date")
          .val()
          .trim(),
        //url: randURL2,
        UserId: req.user.id
      }
    });
    window.location.href = "/potlist";
    return false;
  });
});
