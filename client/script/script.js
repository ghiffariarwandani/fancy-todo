$(document).ready(function () {

  if (localStorage.getItem('tokenId')) {
    showDashboard()
  } else {
    showLogin()
  }

})

function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
      url: 'http://localhost:3000/users/googlesignin',
      method: 'post',
      data: {
        id_token
      }
    })
    .done((response) => {
      localStorage.setItem('tokenId', `${response.token}`)
      Swal.fire(
        'success',
        `welcome ${response.user}`,
        'success'
      )
      showDashboard()
    })
    .fail((jqXHR, textStatus) => console.log(textStatus))
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
    WhenUserHasNotLogin()
    localStorage.clear()
  });
}

function showLogin() {
  $('#userEmail').val('')
  $('#userPassword').val('')
  $('#login-form').show()
  $('#register-form').hide()
  $('#dashboard').hide()
  $('#todos').hide()
  $('#spinner').hide()
  event.preventDefault()
}

function showRegister() {
  event.preventDefault()
  $('#dashboard').hide()
  $('#login-form').hide()
  $('#register-form').show()
  $('#spinner').hide()
}

function logout() {
  Swal.fire(
    'Success',
    'mampir lagi ya!',
    'success'
  )
  signOut()
  localStorage.clear()
  showLogin()
}

function showDashboard() {
  $('#login-form').hide()
  $('#register-form').hide()
  $('#todos').hide()
  $('#spinner').hide()

  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/todos/calender',
    headers: { token: localStorage.getItem('tokenId') }
  })
  .done(response => {
    $('list-holiday').empty
    for(let i=0; i<response.length; i++){
      $('#list-holiday').append(`
       <tr>
          <th scope="row">${i+1}.</th>
          <th id="todo-name" scope="row">${response[i].name}</th>
          <th id="todo-description" scope="row">${response[i].date.iso}</th>
          <th id="todo-duedate" scope="row">${response[i].type[0]}</th>
        </tr>
      `)
    }
  })
  .fail((jqXHR, textStatus) => {
    console.log(textStatus);
  })

  $('#dashboard').show()
}

function showTodos() {
  $('#login-form').hide()
  $('#register-form').hide()
  $('#dashboard').hide()
  $('#spinner').hide()
  
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/todos',
    headers: {
      token: localStorage.getItem('tokenId')
    }
  })
  .done(response => {
    $('#todo-list-table').empty()
      let todos = response.found

      for (let i = 0; i < todos.length; i++) {

        let isStatus = ''
        let changeStatus = ''

        if (todos[i].status) {
          isStatus = `<i style="font-size: 20px; padding-left: 10px" class="far fa-check-square"></i>`
          changeStatus = 'completed'
        } else {
          isStatus = `<i style="font-size: 20px; padding-left: 10px" class="far fa-times-circle"></i>`
          changeStatus = 'uncompleted'
        }

        $('#todo-list-table').append(`
        <tr>
          <th scope="row">${i+1}.</th>
          <th id="todo-name" scope="row">${todos[i].name}</th>
          <th id="todo-description" scope="row">${todos[i].description}</th>
          <th id="todo-duedate" scope="row">${todos[i].duedate}</th>
          <th scope="row"> ${isStatus} </th>
          <th> <a href="#" onclick="updateTodo('${todos[i]._id}', '${todos[i].status}')" style="color: black"> ${changeStatus} </a> </th>
          <th> <a href="#" data-toggle="modal" data-target="#edit-todo" onclick="editTodo('${todos[i]._id}', '${todos[i].name}', '${todos[i].description}', '${todos[i].duedate}')"> <i class="fas fa-edit"></i> </a> | <a href="#" onclick="deleteTodo('${todos[i]._id}')"> <i class="fas fa-trash"></i> </a> </th>
        </tr>
        `)
      }
      $('#todos').show()
    })
    .fail((jqXHR, textStatus) => {
      console.log(textStatus);
    })
}

function deleteTodo(todoId){
  
  $.ajax({
    method: 'delete',
    url: `http://localhost:3000/todos/${todoId}`,
    headers: {token: localStorage.getItem('tokenId')}
  })
  .done(response => {
    Swal.fire(
      'success',
      `deleted todo!`,
      'success'
    )
    showTodos()
  })
  .fail((jqXHR, textStatus) => {
    Swal.fire(
      'Fail',
      `${textStatus}`,
      'warning'
    )
  })
}

function editTodo(todoId, todoName, todoDesc, todoDuedate){

  document.getElementById("todo-name-edit").value = todoName
  document.getElementById("todo-description-edit").value = todoDesc
  document.getElementById("todo-duedate-edit").value = todoDuedate

  $('#edit-todo-form').submit(function(e) {
    e.preventDefault()
    $.ajax({
      method: 'put',
      url: `http://localhost:3000/todos/${todoId}`,
      data: {
        name: $('#todo-name-edit').val(),
        description: $('#todo-description-edit').val(),
        duedate: $('#todo-duedate-edit').val()
      },
      headers: { token: localStorage.getItem('tokenId') }
    })
    .done(response => {
      Swal.fire(
        'success',
        `updated todo!`,
        'success'
      )
      showTodos()
    })
    .fail((jqXHR, textStatus) => {
      Swal.fire(
        'Fail',
        `Invalid Input date`,
        'warning'
      )
      showTodos()
    })
  })
}

function updateTodo(todoId, todoStatus){

  $.ajax({
    method: 'patch',
    url: `http://localhost:3000/todos/${todoId}?status=${todoStatus}`,
    headers: { token: localStorage.getItem('tokenId') }
  })
  .done(response => {
    showTodos()
  })
  .fail((jqXHR, textStatus) => {

  })

}


$('#register-form').submit(function (e) {
  e.preventDefault()
  $('spinner').show()
  $.ajax({
      method: 'post',
      url: 'http://localhost:3000/users/register',
      data: {
        username: $('#username-register').val(),
        email: $('#email-register').val(),
        password: $('#password-register').val()
      }
    })
    .done(response => {
      $('#spinner').hide()
      Swal.fire(
        'Success',
        'Please Login to use Our Service',
        'success'
      )
      showLogin()
    })
    .fail((jqXHR, textStatus) => {
      
      Swal.fire(
        'Fail',
        `Username or Email already use`,
        'error'
      )
      $('#username-register').val(''),
      $('#email-register').val(''),
      $('#password-register').val('')
    })
})

$('#login-form').submit(function (e) {
  e.preventDefault()
  
  $.ajax({
      method: 'post',
      url: 'http://localhost:3000/users/signin',
      data: {
        email: $('#userEmail').val(),
        password: $('#userPassword').val()
      }
    })
    .done(response => {
      
      Swal.fire(
        'success',
        `welcome ${response.username}`,
        'success'
      )
      localStorage.setItem('tokenId', response.token)
      showDashboard()

    })
    .fail((jqXHR, textStatus) => {
      Swal.fire(
        'Fail',
        `Wrong email/password`,
        'error'
      )
      $('#userEmail').val('')
      $('#userPassword').val('')
    })
})

$('#create-todo-form').submit(function () {
  event.preventDefault()

  const todo = {
    name: $('#todo-name-create').val(),
    description: $('#todo-description-create').val(),
    duedate: $('#todo-duedate-create').val()
  }

  $.ajax({
      method: 'post',
      url: 'http://localhost:3000/todos',
      data: todo,
      headers: {
        token: localStorage.getItem('tokenId')
      }
    })
    .done(response => {
      Swal.fire(
        'success',
        `New todo added!`,
        'success'
      )
      showTodos()
    })
    .fail((jqXHR, textStatus) => {
      Swal.fire(
        'fail',
        `invalid input date`,
        'warning'
      )
    })
})

