
// let baseUrl = "http://localhost:8080/team/stats"
let baseUrl = "https://lwl-ipl-stats.herokuapp.com/team/stats"
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

function getLabelDetails(){
    fetch(`${baseUrl}/labels`).then(json=>json.json()).then(data=>{
       let str =  `<select class="form-select" aria-label="team labels" id="teamLabel" onChange="showTeamDetails()">
                  <option selected value="">Select Team Label</option>`
            data.forEach(element => {
                    str += `<option value=${element}>${element}</option>`
            });
       str +=`</select>`
       document.querySelector("#team_labels_id").innerHTML = str;
    })
}

function showTeamDetails(){
 
   let teamLabel= document.querySelector("#teamLabel").value;
   loadChart(teamLabel);
   if(teamLabel !=""){
    fetch(`${baseUrl}/${teamLabel}/players`).then(json=>json.json()).then(data=>{
       let str = `
       <table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Role</th>
      <th scope="col">Country</th>
      <th scope="col">Amount (INR)</th>
    </tr>
  </thead>
  <tbody>
       `
        data.forEach(ele=>{
            str += `<tr>
            <td>${ele.name}</td>
            <td>${ele.role}</td>
            <td>${ele.country}</td>
            <td>${ele.amount}</td>
            </tr>`
        })

       str +=`
       </tbody>
       </html>
       `
       document.querySelector("#player_details_id").innerHTML = str;
     });
   }
}

function loadChart(teamLabel){
    fetch(`${baseUrl}/${teamLabel}/teamamount`).then(json=>json.json()).then(data=>{
            let roleCount = [];
            let roleAmount = [];
            data.forEach(ele=>{
                console.log(ele);
                roleCount.push([ele.role,ele.count]);
                roleAmount.push([ele.role,ele.totalAmount]);
            })
    
            google.charts.setOnLoadCallback(rolePieChart(roleCount));
            google.charts.setOnLoadCallback(amountBarChart(roleAmount));
    });
}

function getTeamStats(){

    fetch(`${baseUrl}/amounts`).then(json=>json.json()).then(data=>{

           let arr = [];
           data.forEach(ele=>{
                arr.push([ele.teamName,ele.amount]);
           }) 
           google.charts.setOnLoadCallback(teamsAmountColChart(arr));    

    });

    fetch(`${baseUrl}/roles`).then(json=>json.json()).then(data=>{
        let roleCount = [];
        let roleAmount = [];
        data.forEach(ele=>{
             roleCount.push([ele.role,ele.count]);
             roleAmount.push([ele.role,ele.amount]);
        }) 
        google.charts.setOnLoadCallback(roleCountPieChart(roleCount));   
        google.charts.setOnLoadCallback(roleAmountPieChart(roleAmount));   
    });

}

getTeamStats();
getLabelDetails();

//



// Set a callback to run when the Google Visualization API is loaded.


// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function rolePieChart(chartData) {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'count');
  data.addRows(chartData);

  // Set chart options
  var options = {'title':'Role and count information',
                 'width':500,
                 'height':400};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('pie_div'));
  chart.draw(data, options);
}


function amountBarChart(chartData) {
    var data = new google.visualization.DataTable();
  data.addColumn('string', 'Role');
  data.addColumn('number', 'Amount');
  data.addRows(chartData);

  // Set chart options
  var options = {'title':'Role and count information',
                 'width':500,
                 'height':400};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.ColumnChart(document.getElementById('col_div'));
  chart.draw(data, options);
}

function teamsAmountColChart(chartData) {
    var data = new google.visualization.DataTable();
  data.addColumn('string', 'Team');
  data.addColumn('number', 'Total Amount');
  data.addRows(chartData);

  // Set chart options
  var options = {'title':'Role and count information',
                 'width':500,
                 'height':400};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.ColumnChart(document.getElementById('team_amount_id'));
  chart.draw(data, options);
}


function roleCountPieChart(chartData) {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Role');
    data.addColumn('number', 'Count');
    data.addRows(chartData);
  
    // Set chart options
    var options = {'title':'Role and count information',
                   'width':500,
                   'height':400};
  
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('role_count_id'));
    chart.draw(data, options);
  }

  function roleAmountPieChart(chartData) {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Role');
    data.addColumn('number', 'Total Amount');
    data.addRows(chartData);
  
    // Set chart options
    var options = {'title':'Role and count information',
                   'width':500,
                   'height':400};
  
    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('role_amount_id'));
    chart.draw(data, options);
  }