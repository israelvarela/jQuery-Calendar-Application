// Variables For Days and Hours //
var currentDay = moment().format("dddd, MMMM Do");
var workHours = [
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
];
var militaryHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
var currentHour = moment().hour();

// Header With Today's Date //
$("#currentDay").text(currentDay);

// Create A Separate Row For Each Hour Of the Day //
for (i = 0; i < workHours.length; i++) {
  // DOM Elements For Each Work Hour Here //
  var row = $("<div class='row'>");
  var timeHour = $("<div class='hour col-1'>").text(workHours[i]);
  var timeBlock = $("<textarea class='time-block col-10'>").attr("id", i);

  // Assign Past, Present, and Future  Cases //
  if (currentHour === militaryHours[i]) {
    timeBlock.addClass("present");
  } else if (currentHour > militaryHours[i]) {
    timeBlock.addClass("past");
  } else {
    timeBlock.addClass("future");
  }

  // Appending Save Buttons //
  var savBttnImg = $("<i class='fas fa-save fa-2x'>");
  var saveBtn = $("<button class='saveBtn col-1'>")
    .attr("data-id", i)
    .append(savBttnImg);

  row.append(row, timeHour, timeBlock, saveBtn);

  // Display Elements To The Webpage //
  $(".container").append(row);
}

// Save Data To Local Storage Here //
$(".saveBtn").on("click", function () {
  var buttonId = $(this).attr("data-id");
  var event = $("#" + buttonId).val();
  var taskObj = JSON.parse(localStorage.getItem("task")) || [];
  taskObj.push({
    time: buttonId,
    description: event,
  });
  // Add Stringify To Local Storage //
  localStorage.setItem("task", JSON.stringify(taskObj));
});

// Load Data To Local Storage Using The Parse JSON Function //
$(document).ready(function () {
  var savedTasks = JSON.parse(localStorage.getItem("task"));
  for (var i = 0; i < savedTasks.length; i++) {
    var updatedHour = savedTasks[i].time;
    var updatedText = savedTasks[i].description;
    $("#" + updatedHour).text(updatedText);
  }
});

