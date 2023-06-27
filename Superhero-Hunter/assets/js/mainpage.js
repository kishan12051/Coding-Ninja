// Function to call the api to fetch data and display on home page
function getCharacters(){
    const char_url = `http://gateway.marvel.com/v1/public/characters?&ts=1&apikey=26cd8e7d36c0122137914a00f6b87862&hash=f7fb73edbdb6b9355a7c4c7a6a7d68b9&limit=100`
    getCharApi(char_url)
}
getCharacters()

// Fetching the data of all the characters to display on the home page
async function getCharApi(char_url){
    const res = await fetch(char_url)
    const data = await res.json()
    renderCharList(data.data.results) 
}

// Rendering the characters list in the homepage
function renderCharList(data){
    const charListUl = document.getElementById('charListUl')
    for(let i=0;i<data.length;i++){
        const li = document.createElement('li')
        li.className = 'char'
        li.innerHTML = 
            `
                    <div class="img">
                        <img class="charImg" src="${data[i].thumbnail.path}.jpg" alt="">
                    </div>
                    <div class="details">
                        <p class="name">${data[i].name}</p>
                        <p class="comics">Comics: ${data[i].comics.available}</p>
                        <p class="series">Series: ${data[i].series.available}</p>
                    </div>
            `
        charListUl.append(li)
    }
}

// Fetching the data through Marvel API, according to the input in the searchbar and Storing it in an Array arr.
async function getApi(api_url){
    const res = await fetch(api_url)
    const data = await res.json() 
    searchListFunc(data.data.results)
}


// Collecting some element in variables to handle press event
const searchbar = document.getElementById('name')
const ul = document.getElementById('ul')
const searchList = document.getElementById('search-list')
const notFound = document.getElementById('notFound')

// Handling Event when user enter some input in search field
searchbar.onkeyup = function(event){
    let userData = event.target.value;
    if(userData!=''){
        while (ul.hasChildNodes()){
            ul.firstChild.remove()
        }
        var api_url = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${userData}&ts=1&apikey=26cd8e7d36c0122137914a00f6b87862&hash=f7fb73edbdb6b9355a7c4c7a6a7d68b9`
        getApi(api_url)
    }
    if(userData.length==0){
        searchList.style.display = 'none'
    }
    else{
        searchList.style.display =' block'
    }
}


// Append the searchList according to the data inserted in searchbar
function searchListFunc(data){
        // Show and Hide Search List of Characters
        var len = data.length
        if(len==0){
            notFound.style.display = 'block'
        }else{
            notFound.style.display = 'none'
        }
        // Rendering searchList
        for(let i=0;i<len;i++){
            const li = document.createElement('li')
            li.className = 'flex j-sb a-c'
            li.innerHTML = 
                            `
                                <a href=${"/Superhero-Hunter-App-Coding-Ninjas/character.html?character=" + data[i].id}git class="flex j-sb a-c" style="text-decoration:none;color:black;">
                                    <div class="left flex a-c">
                                        <img src="${data[i].thumbnail.path}.jpg" alt="" id="img1">
                                        <p class="charName" id="charName1">
                                            ${data[i].name}
                                        </p>
                                    </div>
                                </a>
                                <button class="addFav" name="${data[i].name}" id="${data[i].id}"><i class="fa-solid fa-plus addFavi"></i></button>
                            `
            // Appending the Character list
            ul.append(li)
        }

        // Taking action on favourite button
        const addFav = document.querySelectorAll('.addFav')
        
        // Pushing data to LocalStorage whenever clicked on the add button
        addFav.forEach((data)=>{
            data.addEventListener('click',function(){
                localStorage.setItem(data.name,data.id)
            })
        })
}



// Show Hide Characters List
const showHideListBtn = document.getElementById('showHideList')
const charList = document.getElementById('charList')
function showHideCharList(){
    var bool = true;
    charList.style.display = 'none';    
    showHideListBtn.addEventListener('click',function(){
        if(bool){
            showHideListBtn.innerHTML = 'Hide List'
            charList.style.display = 'block'
            bool = false;
        }else{
            showHideListBtn.innerHTML = 'Show List'
            charList.style.display = 'none'
            bool = true;
        }
    })
}
showHideCharList()
