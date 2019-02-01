let a = 'event'
$.getJSON(`${a}/all`, data => {
    event = data
    makeTable(data)

})

$('#submit').click(function(){
    if($('#name').val()=="" || $('#name').val()==[])
{
    
    $('#namewarning').show(200)
    $('#namewarning').delay(2000).hide(500); 
}
else if($('#vanue').val()=="" || $('#venue').val()==[]){
    $('#venuewarning').show(200)
    $('#venuewarning').delay(2000).hide(500);
}
else if($('#date').val()=="" || $('#date').val()==[]){
    $('#datewarninng').show(200)
    $('#datewarninng').delay(2000).hide(500);
}
else if( $('#description').val()=="" || $('#description').val()==[])
{
 $('#descriptionwarning').show(200)
 $('#descriptionwarning').delay(2000).hide(500); 
}
else{
    let insertObj ={

     
        name: $('#name').val(),
        venue:$('#venue').val(),
        date:$('#date').val(),
        description:$('#description').val()
        
     }
    
     $.post('event/insert',insertObj,function(data){
         
       $('#success').show(200)
        $('#success').delay(2000).hide(500); 
        update()
     })
    }
})

$('#namewarning').hide()
$('#datewarninng').hide()
$('#venuewarning').hide()
$('#descriptionwarning').hide()
$('#success').hide()

function makeTable(data) {

    let table = `
 
    <div class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Event Status</h4>
                  <input type="text" class="form-control" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name">

                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table id="myTable" class="table">
                      <thead class=" text-primary">
                        <th data-field="id">Name</th>
                        <th data-field="name" data-sortable="true">Venue</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </thead>
                      <tbody>
                        <tr>
   `   
    $.each(data, function (i, item) {
        table += `
        <td>${item.name}</td>
        <td>${item.venue}</td>
        <td>${item.date}</td>
        <td>${item.description}</td>    
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
    const result = event.find(item => item.id == id);
    edit()
    $('#pid').val(result.id)
    $('#pname').val(result.name)
    $('#pvenue').val(result.venue)
    $('#pdate').val(result.date)
    $('#pdescription').val(result.description)
})

$('#update').click(function () {
    let updateobj = {
        id: $('#pid').val(),
        name: $('#pname').val(),
        venue:$('#pvenue').val(),
        date:$('#pdate').val(),
        description:$('#pdescription').val()

    }
    $.post(`${a}/update`, updateobj, function data() {
        update()
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
    $.getJSON(`event/all`, data => {
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
