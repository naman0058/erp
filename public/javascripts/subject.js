let a = 'subject'
let assignment = []
let department = []
let year = []
let batch = []

$.getJSON(`/department/all`, data => {
    department = data
    fillDropDown('departmentid', data, 'Choose Department', 0)
})

$.getJSON(`/year/all`, data => {
    year = data
    fillDropDown('yearid', data, 'Choose Year', 0)
})

$.getJSON(`/batch/all`, data => {
    batch = data
    fillDropDown('batchid', data, 'Choose Batch', 0)
})


$.getJSON(`${a}/all`, data => {
    assignment = data
    makeTable(data)

})


$('#submit').click(function(){
    if($('#departmentid').val()=="" || $('#departmentid').val()==[])
{
    
    $('#departmentwarning').show(200)
    $('#departmentwarning').delay(2000).hide(500); 
}
else if($('#yearid').val()=="" || $('#yearid').val()==[]){
    $('#yearwarning').show(200)
    $('#yearwarning').delay(2000).hide(500);
}
else if($('#batchid').val()=="" || $('#batchid').val()==[]){
    $('#batchwarning').show(200)
    $('#batchwarning').delay(2000).hide(500);
}
else if($('#name').val()=="" || $('#name').val()==[]){
    $('#namewarning').show(200)
    $('#namewarning').delay(2000).hide(500);
}
else{
    let insertObj ={

        departmentid : $('#departmentid').val(),
        yearid : $('#yearid').val(),
        batchid : $('#batchid').val(),
        name: $('#name').val(),
        
     }
    
     $.post('subject/insert',insertObj,function(data){
         
       $('#success').show(200)
        $('#success').delay(2000).hide(500); 
        update()
     })
    }
})

$('#namewarning').hide()
$('#departmentwarning').hide()
$('#yearwarning').hide()
$('#success').hide()
$('#batchwarning').hide()



function makeTable(data) {


                          
      

    let table = `
 
    <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Subject Status</h4>
                  <input type="text" class="form-control" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name">

                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table id="myTable" class="table">
                      <thead class=" text-primary">
                        <th data-field="id">Name</th>
                        <th data-field="name" data-sortable="true">Department</th>
                        <th>Year</th>
                        <th>Batch</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </thead>
                      <tbody>
                        <tr>
   `
    $.each(data, function (i, item) {
        table += `
        <td>${item.name.toUpperCase()}</td>
        <td>${item.departmentname}</td>
        <td>${item.year.toUpperCase()}</td>
        <td>${item.batch}</td>
        <td><button class="btn btn-sm btn-primary edit" id="${item.id}"><span class="glyphicon glyphicon-edit"></span> Edit</button></td>
        <td><button class="btn btn-sm btn-danger delete" id="${item.id}"><span class="glyphicon glyphicon-trash"></span> Delete</button></td>
        </tr>`
    })
    table += ` </tbody>
    </table>
  </div>
</div>
</div>
</div>
`

    $('#result').html(table)
}


$('#result').on('click', '.edit', function () {
    const id = $(this).attr('id')
    const result = assignment.find(item => item.id == id);
    fillDropDown('pdepartmentid', department, 'Choose Department', result.departmentid)
    fillDropDown('pyearid', year, 'Choose Year', result.yearid)
    fillDropDown('pbatchid', batch, 'Choose Batch', result.batchid)

    edit()
    $('#pid').val(result.id)
    $('#pdepartmentid').val(result.departmentid)
    $('#pyearid').val(result.yearid)
    $('#pbatchid').val(result.batchid)
    $('#pname').val(result.name)
    

})

$('#update').click(function () {
    let updateobj = {
        id: $('#pid').val(),
        departmentid : $('#pdepartmentid').val(),
        yearid : $('#pyearid').val(),
        batchid : $('#pbatchid').val(),
         name: $('#pname').val(),
         }
    $.post(`${a}/update`, updateobj, function data() {
        update()
        refresh()
    })
})

$('#result').on('click', '.delete', function() {
    const id = $(this).attr('id')
    $.get(`${a}/delete`,  { id }, data => {
        refresh()
    })
})



/*fill dropdown*/


function fillDropDown(id, data, label, selectedid = 0) {
    $(`#${id}`).empty()
    $(`#${id}`).append($('<option>').val("null").text(label))

    $.each(data, (i, item) => {
        if (item.id == selectedid) {
            $(`#${id}`).append($('<option selected>').val(item.id).text(item.name))
        } else {
            $(`#${id}`).append($('<option>').val(item.id).text(item.name))
        }
    })
}
  




/*function start*/

start()
function start() {
    $('#editdiv').hide()
    $('#insertdiv').hide()
}

function update() {
    $('#result').show()
    $('#editdiv').hide()
    $('#insertdiv').hide()
    $('#refresh').show()
    $('#new').show()
    refresh()
}

function refresh() {
    $.getJSON(`${a}/all`, data => {
        makeTable(data)
    })
}


function edit() {
    $('#editdiv').show(1000)
    $('#insertdiv').hide()
    $('#back').show()
    $('#refresh').hide()
    $('#result').hide()
    $('#new').hide()
}

function insert() {
    $('#insertdiv').show(1000)
    $('#back').show()
    $('#refresh').hide()
    $('#result').hide()
    $('#editdiv').hide()
    $('#new').hide()
}

$('#new').click(function () {
    insert()
})


$('#refresh').click(function(){
refresh()
})

$('#back').click(function () {
    start()
    $('#refresh').show()
    $('#new').show()
    $('#result').show(1000)

})

function myFunction() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
