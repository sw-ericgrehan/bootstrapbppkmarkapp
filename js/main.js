document.getElementById('myForm').addEventListener('submit',saveBookmark);

//Save Bookmark Function
function saveBookmark(e)
{
    //Get form values
    let siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteURL').value;

    if(!ValidateForm(siteName,siteUrl))
    {
        return false;
    }
    
    let bookMark = {
        name: siteName,
        url: siteUrl
    }

    //local storage test
    // localStorage.removeItem('test');
    // localStorage.setItem('test','Hello World2');
    // console.log(localStorage.getItem('test'));
    // console.log(localStorage.getItem('test'));
    
    //Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null)
    {
        // localStorage.removeItem('test');
        // localStorage.removeItem('bookmarks');
        // localStorage.removeItem('bookmarks');
        
        //init array
        var bookmarks = [];
        //Add to Array
        bookmarks.push(bookMark);
        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        console.log('bookmarks');
    }
    else{
       let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
       //add bookmark to array
       bookmarks.push(bookMark);
       //Reset to local storage
       localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('myForm').reset(); 
    
     //Prevent form form submiting so that we can view results in console log otherwise will just flash
   e.preventDefault();
   fetchBookmarks();
}

//Once Delete button is clicked
function deleteBookmark(url)
{
    console.log(url);
   //Get bookmarks from local storage
   let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
   //Loop through bookmarks
   for(let i=0;i<bookmarks.length;i++)
   {
       if(bookmarks[i].url ==url)
       {
           //remove from array
            bookmarks.splice(i,1);
       }
   }
   ///resets local storage after url is deleted 
   localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
   //Refetch Bookmarks
   fetchBookmarks();
}

function fetchBookmarks()
{
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    console.log(bookmarks);

    //Get out ID
    let bookmarkResults = document.getElementById('bookmarkResults');

    //Build Output
    bookmarkResults.innerHTML = '';

    for(let i = 0; i<bookmarks.length;i++)
    {
        let name =  bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarkResults.innerHTML +=    '<div class = "card bg-light text-dark card-body mt-3">'+
                                        '<h3>'+name+
                                        '<a class ="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
                                        '<a onClick="deleteBookmark(\''+url+'\')" class ="btn btn-danger" href="#">Remove</a> ' +
                                        '</h3>'+'</div>';
    }

    //This is not relaoding the page automatically once a bookmark is added
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function ValidateForm(siteName,siteUrl)
{
    if(!siteName || !siteUrl)
    {
        alert('Please Fill In the Form');
        return false;
    }

    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if(!siteUrl.match(regex))
    {
        alert('Please eneter a valid Url');
        return false;
    }
    return true;
}

