let a = 'library'
let library = []

$.getJSON(`${a}/all`, data => {
    faculity = data
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
                  <h4 class="card-title ">Library Status</h4>
                  <input type="text" class="form-control" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name">

                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table id="myTable" class="table">
                      <thead class=" text-primary">
                        <th data-field="id">Name</th>
                        <th data-field="name" data-sortable="true">Email</th>
                        <th>Mobile Number</th>
                        <th>Image</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </thead>
                      <tbody>
                        <tr>
   `   
     $.each(data, function (i, item) {
        table += `
        <td>${item.name.toUpperCase()}</td>
        <td>${item.email}</td>
        <td>${item.number}</td>
        <td> <img src='/images/${item.logo}' style="width:50px"; height: 100px" /></td>
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
    const result = faculity.find(item => item.id == id);
   
    edit()
    $('#pid').val(result.id)
    $('#pname').val(result.name)
    $('#pemail').val(result.email)
    $('#pnumber').val(result.number)
    

})

$('#update').click(function () {
    let updateobj = {
        id: $('#pid').val(),
        name: $('#pname').val(),
        email: $('#pemail').val(),
        number: $('#pnumber').val(),
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
            txtValue = td.textContent ||    td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}
