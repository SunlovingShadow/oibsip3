$(document).ready(function() {
    // Load tasks from localStorage on page load
    loadTasks();
  
    $(".tdl-new").keypress(function(e) {
      if (e.which === 13) {
        e.preventDefault();
        var inputValue = $(this).val().trim();
        if (inputValue !== "") {
          $(".tdl-content ul").append(
            "<li><label><input type='checkbox'><i></i><span>" +
              inputValue +
              "</span><a href='#'>–</a></label></li>"
          );
          $(this).val("");
          saveTasks(); // Save tasks to localStorage
        }
      }
    });
  
    $(".tdl-content").on("click", "a", function() {
      var li = $(this).parent().parent("li");
      li.addClass("remove").stop().delay(100).slideUp("fast", function() {
        li.remove();
        saveTasks(); // Save tasks to localStorage after removing a task
      });
      return false;
    });
  
    // Event listener for checkbox change
    $(".tdl-content").on("change", "input[type='checkbox']", function() {
      var taskText = $(this).siblings("span");
      if ($(this).is(":checked")) {
        taskText.addClass("completed");
      } else {
        taskText.removeClass("completed");
      }
      saveTasks(); // Save tasks to localStorage after checkbox change
    });
  
    // Function to save tasks to localStorage
    function saveTasks() {
      var tasks = [];
      $(".tdl-content ul li").each(function() {
        var task = {
          text: $(this).find("span").text(),
          checked: $(this).find("input[type='checkbox']").prop("checked")
        };
        tasks.push(task);
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Function to load tasks from localStorage
    function loadTasks() {
      var storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        var tasks = JSON.parse(storedTasks);
        $.each(tasks, function(index, task) {
          var checkedAttribute = task.checked ? "checked='checked'" : "";
          var listItem =
            "<li><label><input type='checkbox' " +
            checkedAttribute +
            "><i></i><span class='" + (task.checked ? "completed" : "") + "'>" +
            task.text +
            "</span><a href='#'>–</a></label></li>";
          $(".tdl-content ul").append(listItem);
        });
      }
    }
  });

  // Function to update the date and time
  function updateDateTime() {
    const dateTimeElement = document.getElementById("date-time");
    
    // Create a new Date object to get the current date and time
    const now = new Date();
    
    // Format the date and time as a string
    const dateTimeString = now.toLocaleString(); // You can customize the format if needed
    
    // Set the content of the element to the formatted date and time
    dateTimeElement.textContent = dateTimeString;
  }
  
  // Call the updateDateTime function to initially display the date and time
  updateDateTime();
  
  // Optionally, update the date and time at regular intervals (e.g., every second)
  setInterval(updateDateTime, 1000); // Update every 1000 milliseconds (1 second)
