//do not under any circumstance remove this line
$(document).foundation();


(function () {
//Get services elements
    var theServices = document.querySelectorAll('.service_action');

    // the XMLHttpRequest object is a built-in part of every browser's JavaScript API. It has methods (functions) and propeties that you can run to do an AJAX request. Declaring it with round brackets at the end instantiates (creates) a new instance of the object.
    const httpRequest = new XMLHttpRequest();

    // the getCarData function fires every time you click on a car thumbnail; it passes itself into the function (the 'this' keyword referes to the object that called the function => the element clicked on) so that we can use that element's ID attribute as a reference to pass to the query we want to run. We're retrieving a single row from the database where the ID that we pass matches the field we've referenced in the query (in the functions.php file)
    function getService() {
        // make an AJAX call to the database; handle errors first
        if (!httpRequest) { // this is for older browser that don't support AJAX
            alert('Giving up :( Cannot create an XMLHTTP instance');
            return false; // exit the whole process and don't do anything else - we're done
        }

        // there are 4 stages to an AJAX request: the init, sending the url, getting the response, and done. every time that state changes (the readystate) we fire the processRequest function to catch errors or do something with the data that gets returned from the database when the request is finished
        httpRequest.onreadystatechange = processRequest;
        var idService = this.getAttribute('data-id')
        httpRequest.open('GET', './includes/functions.php?service=' + idService); // pass in the id from the element we're clicking on
        httpRequest.send(); // run the PHP file (or whatever is in the .open method above)
    }

    // httpRequest.onreadystatechange (on line 19) will call this 4 times. We process / monitor the status of the AJAX call. When it's done (lines 29 and 30) that means our call was successful and we have some data returned from the database to process
    function processRequest() {

        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) { // 200 means everything is awesome
                //debugger;
                // JSON.parse turns the stingified database response (the database row) into a plain object that JavaScript can use
                let data = JSON.parse(httpRequest.responseText);

                // send our object through to the function that will do the page update - plug in the text, change the css opacity, etc
                processResult(data);
            } else {
                // if anything went wrong with the AJAX call, this will be called instead and we'll be done => need to fix any errors
                alert('There was a problem with the request.');
            }
        }
    }

    // processResult is run when the AJAX call is complete and we have the data back. It gets called on line 36, and the data variable gets passed in from that function (it's the JavaScript object we got from the database)
    function processResult(data) {
        // destructure the data and extract only what we need
        // the data is coming in as an object - it's 'structured' data. We can reach into it and pull out just the values we need by using a destructuring assignment

        const {service_description} = data;

        // this is statement chaining - we can select an element and change its content all at once, instead of doing it in multiple steps
        let desc = document.querySelector('#service_description').textContent = service_description;


    }


//Add event listener for services circles
    theServices.forEach(function (element, index) {
        //loop through and do stuff to each element at the top of the page
        element.addEventListener('click', getService, false);
    });

//Lightbox
    var theThumbnails = document.querySelectorAll('.thumbnail');

    function popLightbox(currentIndex, currentObject) {
        //debugger;
        window.scrollTo(0, 0);
        document.body.style.overflow = "hidden";

        // turn on the lightbox
        let lightbox = document.querySelector('.lightbox');
        lightbox.style.display = 'block';

        // populate all the content on the page
        let lightboxImg = lightbox.querySelector('img');
        let lightboxClose = lightbox.querySelector('.close-lightbox');
        let lightboxDesc = lightbox.querySelector('p');

        //lightboxImg.src = "images/" + currentObject.images[currentIndex];
        //lightboxDesc.innerHTML = currentObject.imageDescription[currentIndex];

        lightboxClose.addEventListener('click', closeLightbox, false);
    }
    function  closeLightbox() {
        // turn on the lightbox
        let lightbox = document.querySelector('.lightbox');
        lightbox.style.display = 'none';
    }
    theThumbnails.forEach(function (element, index) {
        //loop through and do stuff to each element at the top of the page
        element.addEventListener('click', popLightbox, false);
    });
})();
