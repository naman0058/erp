let a = 'assignment'
let assignment = []
let department = []
let year = []
let batch = []
let subject = []

$.getJSON(`/department/all`, data => {
    department = data
    fillDropDown('departmentid', data, 'Choose Department', 0)
})

$.getJSON(`/year/all`, data => {
    year = data
    fillDropDown('yearid', data, 'Choose Year', 0)
})

$.getJSON(`/subject/all`, data => {
    subject = data
    fillDropDown('subjectid', [], 'Choose Subject', 0)
})


$.getJSON(`/batch/all`, data => {
    batch = data
    fillDropDown('batchid', data, 'Choose Batch', 0)
})

$('#batchid').change(() => {
    const filteredData = subject.filter(item => item.departmentid == $('#departmentid').val() 
    && item.yearid == $('#yearid').val() && item.batchid == $('#batchid').val() )
    fillDropDown('subjectid', filteredData, 'Choose Subject', 0)
})


$.getJSON(`${a}/all`, data => {
    assignment = data
    makeTable(data)

})


function makeTable(data) {


                          
      

    let table = `
 
    <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Assignment Status</h4>
                  <input type="text" class="form-control" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name">

                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table id="myTable" class="table">
                      <thead class=" text-primary">
                        <th data-field="id">Department</th>
                        <th data-field="name" data-sortable="true">Year</th>
                        <th>Batch</th>
                        <th>Subject</th>
                        <th>Assignment Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </thead>
                      <tbody>
                        <tr>
   `
    $.each(data, function (i, item) {
        table += `
        <td>${item.departmentname.toUpperCase()}</td>
        <td>${item.year.toUpperCase()}</td>
        <td>${item.batch}</td>
        <td>${item.subject}</td>
        <td>${item.name}</td>
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


$('#pbatchid').change(() => {
    const filteredData = subject.filter(item => item.departmentid == $('#pdepartmentid').val() 
    && item.yearid == $('#pyearid').val() && item.batchid == $('#pbatchid').val() )
   
    fillDropDown('psubjectid', filteredData, 'Choose Subject', 0)
})


$('#result').on('click', '.edit', function () {
    const id = $(this).attr('id')
    const result = assignment.find(item => item.id == id);
    fillDropDown('pdepartmentid', department, 'Choose Department', result.departmentid)
    fillDropDown('pyearid', year, 'Choose Year', result.yearid)
    fillDropDown('pbatchid', batch, 'Choose Batch', result.batchid)
   $('#psubjectid').append($('<option>').val(result.subjectid).text(result.subject))
    

    edit()
    $('#pid').val(result.id)
    $('#pdepartmentid').val(result.departmentid)
    $('#pyearid').val(result.yearid)
    $('#pbatchid').val(result.batchid)
    $('#psubjectid').val(result.subjectid)
    $('#pname').val(result.name)
})

$('#update').click(function () {
    let updateobj = {
        id: $('#pid').val(),
        departmentid : $('#pdepartmentid').val(),
        yearid: $('#pyearid').val(),
        batchid: $('#pbatchid').val(),
        subjectid: $('#psubjectid').val(),
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
    $('#result').show(1000)
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
