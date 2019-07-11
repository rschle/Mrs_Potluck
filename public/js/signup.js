$("#user-sign-up").on("submit", function(e) {
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: "/api/signup",
    data: {
      email: $("#email")
        .val()
        .trim(),
      password: $("#password")
        .val()
        .trim(),
      name: $("#name")
        .val()
        .trim()
    }
  })
    .then(function(data) {
      console.log(data);
      // window.location.replace(data);
      window.location.href = "/";
    })
    .catch(function(err) {
      console.log(err);
      alert(err.responseText);
    });
});
