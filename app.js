const siteName = document.querySelector("#siteName");
const siteUrl = document.querySelector("#siteUrl");
const form = document.querySelector("#myForm");
const bookmarksResult = document.querySelector("#bookmarksResults");
const nameError = document.querySelector(".nameError");
const urlError = document.querySelector(".urlError");

form.addEventListener('submit', function(e){
     e.preventDefault();

    let name = siteName.value.trim(),
        url = siteUrl.value.trim();


    if(!name && !url){
         alert("Please fill the form");        
        
         return false;
    }
     else if (!name) {
         alert("Please fill the name .... ");
         return false
     }
    
     else if (!url) {
         alert("Please fill the url .... ");
         return false
     }


        let bookmark = {
            name: name,
            url: url
        }

    let bookmarks = localStorage.getItem('bookmarks');

    if (bookmarks===null){
        bookmarks = [];
    }else{
        bookmarks = JSON.parse(bookmarks);
    }
    
    bookmarks.push(bookmark);

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    e.target.reset();

    datareload();

});

document.addEventListener('DOMContentLoaded', datareload);


function deleteBookmark(e){
    let url =e.getAttribute("data-url");
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if (Array.isArray(bookmarks) && bookmarks.length) {

        bookmarks.forEach(function(bookmark, i){
            if (bookmark.url === url){
                bookmarks.splice(i, 1);
            }
        });
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        datareload();
    }

}

function datareload() {
    
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    if(Array.isArray(bookmarks)){

        bookmarksResult.innerHTML = '';

        bookmarks.forEach(function(bookmark){
            bookmarksResult.innerHTML +=   `  <div class="result mt-2 my-BG p-3 d-flex">
            <h2> ${bookmark.name}  </h2>
            <div class="ms-auto">
                <button class="btn btn-primary ">
                    <a href="${bookmark.url} " class="text-decoration-none text-white" target="_blank"> Visit</a>
                </button>
                <button class="btn btn-danger ">
                    <a href="" class="text-decoration-none text-white" onclick='deleteBookmark(this)' data-url='${bookmark.url}'> Delete</a>
                </button>
            </div>
           
        </div>
       `    
            // "<div class='list-group-item'><h3>" + bookmark.name +"</h3><a href='"+ bookmark.url+"'>Visit</a> <button class='btn btn-danger' onclick='deleteBookmark(this)' data-url='"+bookmark.url+"'>Delete</button></div>";

        });

    }

}