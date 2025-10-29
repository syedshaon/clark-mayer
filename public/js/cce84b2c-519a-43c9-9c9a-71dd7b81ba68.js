jQuery(function ($) {
  // Prevent other scripts from auto-hiding the off-screen menu
  function openOffScreenMenu() {
    $("body").addClass("no-scroll");
    $(".off-screen-menu").stop(true, true).fadeIn(200).css("display", "block");
  }

  function closeOffScreenMenu() {
    $("body").removeClass("no-scroll");
    $(".off-screen-menu").stop(true, true).fadeOut(200);
  }

  // Toggle button click
  $(".toggle-off-screen-menu-area")
    .off("click")
    .on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const isVisible = $(".off-screen-menu").is(":visible");
      if (isVisible) {
        closeOffScreenMenu();
      } else {
        openOffScreenMenu();
      }
    });

  // OPTIONAL: Click outside menu to close
  $(document).on("click", function (e) {
    if ($(".off-screen-menu").is(":visible") && !$(e.target).closest(".off-screen-menu, .toggle-off-screen-menu-area").length) {
      closeOffScreenMenu();
    }
  });

  // Disable any resize-based hiding
  $(window).off("resize");
});
