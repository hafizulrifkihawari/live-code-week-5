var $loginForm = $('#loginForm')
var $email = $('#email')
var $password = $('#password')
var $comicCollection = $('#comicCollection')
var $registerForm = $('#registerForm')
var $updateForm = $('#updateForm')
var $cardData = $('#cardData')
var $getRegisterForm = $('#getRegisterForm')
var $getLoginForm = $('#getLoginForm')
var $submitForm = $('#submitForm')

var $alert = $('#alert')

var url = `http://localhost:3000`

$getRegisterForm.on('click', function(e){
    e.preventDefault()
    $registerForm.show()
    $loginForm.hide()
})

$getLoginForm.on('click', function(e){
    e.preventDefault()
    $loginForm.show()
    $registerForm.hide()
})

$submitForm.on('submit', function(e){
    e.preventDefault()

    var name = $('#registerName').val()
    var email = $('#registerEmail').val()
    var password = $('#registerPassword').val()

    $.ajax({
        method: "POST",
        data: {
            name,
            email,
            password
        },
        url: `${url}/register`,
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token)
        $registerForm.hide()
        getData()
        
        $comicCollection.show()
    })
    .fail(err => {
        console.log(err)
    })
})


function loadPage(){
    // console.log('masuk')
    // console.log($comicCollection)
    // if(localStorage.access_token){
    //     $loginForm.hide()
    //     $comicCollection.show()
    // } else {
    //     $loginForm.show()
    //     $comicCollection.hide()
    // }
}

$loginForm.on('submit', function(e){
    e.preventDefault()
    var email = $email.val()
    var password = $password.val()

    $.ajax({
        method: 'POST',
        url: `${url}/login`,
        data: {
            email,
            password
        }
    })
    .done(response => {
        localStorage.setItem('access_token', response.access_token)
        $loginForm.hide()

        getData()
        
        $comicCollection.show()
        $alert.hide()
    })
    .fail(err => {
        $alert.text(err.responseJSON.errors).show()
    })
})

var template = `
<div class="col-4 mb-4">
    <div class="card text-center">
        <img
            src=""
            class="card-img-top" id="imgCard>
        <div class="card-body">
            <h5 class="card-title" id="titleCard"></h5>
            <p class="card-text" id="authorCard"></p>
            <div id="action">
            </div>
        </div>
    </div>
</div>
`

function getData(){
    var access_token = localStorage.access_token

    $.ajax({
        method: 'GET',
        url: `${url}/comics`,
        headers: {
            access_token: access_token
        }
    })
    .done(response => {
        generateCard(response)
    })
    .fail(err => {
        console.log(err)
    })
}


function generateCard(list){
    $cardData.empty()
    var $action = $('#action')
    for (let i = 0; i < list.length; i++){        
        var $item = $(template)
        $item.find('#titleCard').text(list[i].title)
        $item.find('#authorCard').text(list[i].author)
        $item.find('#action').append(`<button onclick="getUpdateForm(${list[i].id})" class="btn btn-primary">Edit</button>`)
        $cardData.append($item)
    }
}

function getUpdateForm(id){
    // console.log('masuk')
    $updateForm.toggle()

    var access_token = localStorage.access_token

    $.ajax({
        method: 'GET',
        url: `${url}/comics/${id}`,
        headers: {
            access_token: access_token
        },
        data: {
            id: id
        }
    })
    .done(response => {
        $('#updateTitle').val(response.title)
        $('#updateAuthor').val(response.author)
        $('#updateImg').val(response.imageUrl)
        localStorage.setItem('id', response.id)
    })
    .fail(err => {
        console.log(err)
    })
}

$updateForm.on('submit', function(e){
    let id = localStorage.id
    $.ajax({
        method: 'PUT',
        url: `${url}/comics/${id}`,
        data: {
            title:  $('#updateTitle').val(),
            author: $('#updateAuthor').val(),
            imageUrl: $('#updateImg').val()
        },
    })
    .done(response => {
        $updateForm.hide()
    })
    .fail(err => {
        console.log(err)
    })
})