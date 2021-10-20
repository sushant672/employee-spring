
// Adding Employee
function addEmployee(){
  alert("Employee Added successfully");

  var $form = $("#employee-form");
  var json = toJson($form);


  $.ajax({
    url : '../api/employee/',
    type : 'POST',
    data : json,

    success: function(response){
      alert("Employee created");
    },
    error: function(){
      alert("An error occured");
    }

  });
  return true;
}


function toJson($form){
  var serialized = $form.serializeArray();
  console.log(serialized);
  var s = "";

  var data = {};
  for(s in serialized){
    data[serialized[s]['name']] = serialized[s]['value'];
  }

  var json = JSON.stringify(data);
  console.log(json);

  return json;
}



// getting Employee List
function getEmployeeList(event){

  $.ajax({
    url : '../api/employee/',
    type : 'GET',

    success: function(data){
      DisplayList(data);
    },
    error: function(){
      alert("An error occured");
    }

  });
  return true;

}

// Display Employee List
function DisplayList(data){
  var $tbody = $("#employee-table").find("tbody");
  $tbody.empty();

  for(var i in data){
    var e = data[i];
    var buttonHtml = '<button onclick = "deleteEmployee(' + e.id + ')"> delete </button>';
    var row = '<tr> <td>' + e.id
    + '</td> <td>' + e.name
    + '</td> <td>' + e.age
    + '</td> <td>' + buttonHtml + '</td> </tr>';
    $tbody.append(row);
  }
}


// deleting employee by id
function deleteEmployee(id){
  $.ajax({
    url : "../api/emplyee/" + id,
    type : "DELETE",

    success: function(data){
      alert("Employee Deleted");
    },
    error: function(){
      alert("An error occured");
    }
  })
}


// Initailising page
function init(){
  $("#add-employee").click(addEmployee);
  $("#refresh-data").click(getEmployeeList);
}



$(document).ready(init);
