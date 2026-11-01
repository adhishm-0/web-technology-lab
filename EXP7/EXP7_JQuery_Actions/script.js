$(function () {
  const money = value => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value);

  // Question 1: Allocate the budget using the four percentage values.
  $("#budgetForm").on("submit", function (event) {
    event.preventDefault();
    const amount = Number($("#budgetAmount").val());
    const percentages = {
      rent: Number($("#rentPercent").val()),
      accessories: Number($("#accessoriesPercent").val()),
      emergency: Number($("#emergencyPercent").val()),
      saving: Number($("#savingPercent").val())
    };
    const totalPercent = Object.values(percentages).reduce((sum, value) => sum + value, 0);
    if (!Number.isFinite(amount) || amount <= 0 || Object.values(percentages).some(value => value < 0 || value > 100) || totalPercent !== 100) {
      window.alert("Enter a positive amount and percentages that add up to 100%.");
      return;
    }
    $("#rentValue").text(money(amount * percentages.rent / 100));
    $("#accessoriesValue").text(money(amount * percentages.accessories / 100));
    $("#emergencyValue").text(money(amount * percentages.emergency / 100));
    $("#savingValue").text(money(amount * percentages.saving / 100));
    $("#budgetNote").text("Allocation complete · 100% assigned.");
  });

  // Question 2: Calculate cake subtotal, 9% tax, tip, and grand total.
  function calculateCakeOrder() {
    const quantities = [Number($("#smallQty").val()), Number($("#mediumQty").val()), Number($("#largeQty").val())];
    if (quantities.some(quantity => !Number.isInteger(quantity) || quantity < 0)) {
      window.alert("Cake quantities must be whole numbers greater than or equal to zero.");
      return;
    }
    const subtotal = quantities[0] * 100 + quantities[1] * 200 + quantities[2] * 400;
    const tax = subtotal * 0.09;
    const afterTax = subtotal + tax;
    const tip = afterTax * Number($("#tipPercent").val()) / 100;
    $("#cakeSubtotal").text(money(subtotal));
    $("#cakeTax").text(money(tax));
    $("#cakeTip").text(money(tip));
    $("#cakeTotal").text(money(afterTax + tip));
    $("#cakeMessage").text(subtotal > 0 ? "Your order is ready to review." : "Add a cake quantity to start an order.");
  }
  $("#calculateCake").on("click", calculateCakeOrder);
  $("#smallQty, #mediumQty, #largeQty, #tipPercent").on("input change", calculateCakeOrder);
  calculateCakeOrder();

  // Question 3: Update the car preview from workshop control events.
  $(".swatch").on("click", function () {
    const color = $(this).data("color");
    const name = $(this).data("name");
    $("#carBody").css("fill", color);
    $("#paintName").text(name);
    $("#workshopMessage").text(`${name} paint selected.`);
    $(".swatch").removeClass("active");
    $(this).addClass("active");
  });
  $("#wheelFinish").on("change", function () {
    const color = $(this).val();
    $(".wheel circle:nth-child(2)").css("fill", color);
    $("#workshopMessage").text(`${$(this).find(":selected").text()} wheels selected.`);
  });
  $("#windowTint").on("input", function () {
    const tint = Number($(this).val());
    $("#tintValue").text(`${tint}%`);
    $("#carPreview path").filter(function () { return $(this).attr("fill") === "#bfe8f4"; }).css("fill", `rgba(18, 49, 65, ${tint / 100})`);
    $("#workshopMessage").text(`Window tint set to ${tint}%.`);
  });
  $("#spoilerToggle").on("change", function () {
    $("#spoiler").toggle(this.checked);
    $("#workshopMessage").text(this.checked ? "Rear spoiler added." : "Rear spoiler removed.");
  });

  // Screenshot mode: display one finished program output at a time.
  const question = new URLSearchParams(window.location.search).get("q");
  if (question) {
    $("body").addClass("capture-mode");
    $(`#q${question}`).addClass("capture-active");
    if (question === "1") {
      $("#budgetAmount").val("25000");
      $("#budgetForm").trigger("submit");
    }
    if (question === "2") {
      $("#smallQty").val(1); $("#mediumQty").val(2); $("#largeQty").val(1); $("#tipPercent").val("10");
      calculateCakeOrder();
    }
    if (question === "3") {
      $(".swatch[data-name='Racing red']").trigger("click");
      $("#wheelFinish").val("#d2a745").trigger("change");
      $("#windowTint").val(35).trigger("input");
      $("#spoilerToggle").prop("checked", true).trigger("change");
    }
  }
});
