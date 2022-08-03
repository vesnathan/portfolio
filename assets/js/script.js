$(function() {

    /*--------------------------------------------------------------------------------------------- CONST DECS */

    const languageSkills = [
        { text: "HTML",         rating: "80" },
        { text: "CSS",          rating: "80" },
        { text: "Bootstrap",    rating: "75" },
        { text: "JavaScript",   rating: "85" },
        { text: "JQuery",       rating: "85" },
        { text: "React",        rating: "60" },
        { text: "WebSockets",   rating: "50" },
        { text: "Docker",       rating: "20" },
        { text: "Nginx",        rating: "20" },
        { text: "PHP",          rating: "40" },
        { text: "Apache",       rating: "20" },
        { text: "Mongo",        rating: "30" },
        { text: "MySql",        rating: "70" },
        { text: "AWS",          rating: "20" }
    ]
    const personalSkills = [
        { text: "Communication",        rating: "90"  },
        { text: "Teamwork",             rating: "90"  },
        { text: "Organisation",         rating: "95"  },
        { text: "Leadership",           rating: "80"  },
        { text: "Reliability",          rating: "100" },
        { text: "Self-discipline",      rating: "95"  },
        { text: "Integrity",            rating: "100" },
        { text: "Critical Thinking",    rating: "90"  },
        { text: "Problem Solving",      rating: "90"  },
        { text: "Attention to Detali",  rating: "100" } // JOKES!
    ]
    const software = [            
        { text: "Excel",            rating: "95" },
        { text: "Photoshop",        rating: "95" },
        { text: "Visual Studio",    rating: "80" },
        { text: "Premiere Pro",     rating: "80" },
        { text: "After Effects",    rating: "70" },
        { text: "Powerpoint",       rating: "95" },
        { text: "Putty",            rating: "75" }
    ]




    const workHistory = [ { 
        year:       "2019",
        uniqueId:   "scjob",
        image:      "sc.jpg",
        role:       "Senior Event Technician",
        employer:   "Scene Change, Hobart - January 2019 to Present",
        tasks: [
                    "Planned, installed and operated event equipment such as lighting and audio consoles.",
                    "As a part of this role I completed the following projects:"
        ],
        projects: [
            {
                projectTitle:       "Presentation Timer",
                projectDescription: "A web based presentation timer using AWS, JQuery, Node.JS and Websockets.io .This system is able to accommodate multiple rooms/sessions and be customised to match the event branding. It is completely recoverable should the websockets connection or the server be disrupted.",
                projectAnchorId:    "presentationTimer",
                projectAnchorText:  "TIMER DEMO",
                projectPrintText:   "TIMER:",
                projectPrintLink:   "54.66.111.53:3000/timer/demo.html"
            },
            {
                projectTitle:       "Online Event Platform",
                projectDescription: "An online event platfore utilising AWS, JQuery, Node.JS, Websockets.io, and React.",
                projectAnchorId:    "onlineEventPlatform",
                projectAnchorText:  "PLATFORM DEMO",
                projectPrintText:   "PLATFORM:",
                projectPrintLink:   "scvideo.com.au/events/lGDFR72xan"
            }
        ]},{ 
        year:       "2006",
        uniqueId:   "vesjob",
        image:      "ves.jpg",
        role:       "Director/Senior Event Technician",
        employer:   "Vision Event Services, 2006 - 2019",
        tasks: [
                    "Day to day operations of business, including rostering, accounting, etc.",
                    "I developed many projects during this time, including an online Game Show Buzzer system detailed below."
        ],
        projects: [
            {
                projectTitle:       "Game Show Buzzer",
                projectDescription: "A web based Game show Buzzer system utilising JQuery, Node.JS, and Websockets.",
                projectAnchorId:    "gameShowBuzzer",
                projectAnchorText:  "BUZZER DEMO",
                projectPrintText:   "BUZZER:",
                projectPrintLink:   "52.62.156.187:3000/demo.html"
            }
        ]}
    ]

    /*--------------------------------------------------------------------------------------------- FUNCTIONS */

    // This finction animates the slider charts
    function animateChart(array) {
        array.forEach((item) => {
            $(`#${item.text.replaceAll(" ","-")}-fill-div`).addClass(`${item.text.replaceAll(" ","-")}-fill`);
            $(`#${item.text.replaceAll(" ","-")}-Row-fadeIn-div`).addClass(`${item.text.replaceAll(" ","-")}-Row-fadeIn`);
        });
    }

    // and this one resets the slider charts so they can run again
    function resetChart(array) {
        array.forEach((item) => {
            $(`#${item.text.replaceAll(" ","-")}-fill-div`).removeClass(`${item.text.replaceAll(" ","-")}-fill`);
            $(`#${item.text.replaceAll(" ","-")}-Row-fadeIn-div`).removeClass(`${item.text.replaceAll(" ","-")}-Row-fadeIn`); 
        });
    }

    function animateElement(elementId,className) {
        $("#"+elementId).addClass(className);
    }

    function resetElement(elementId,className) {
        $("#"+elementId).removeClass(className);
    }

    // checks the position of slider charts, if they are in view then run animation
    function checkScrollPositionForAnimation() {

        // check where the viewport is
        let screenPos = $(window).scrollTop();

        // divTop = the top of each div we're interested in
        let divTop = $('#otherSkillsArticle').offset().top-800;
        // if this div is oin the current view, animate the chart
        if (screenPos > divTop) { animateChart(software); } 


        divTop = $('#personalSkillsWrapper').offset().top-800;
        if (screenPos > divTop) { animateChart(personalSkills); } 
           
        divTop = $('#languageSkillsWrapper').offset().top-800;
        if (screenPos > divTop) {  animateChart(languageSkills); } 

        workHistory.forEach((job) => {    
            divTop = $("#workHistoryTagFor"+job.uniqueId).offset().top-700;
            if (screenPos > divTop && divTop > 0) {  animateElement(`workHistoryTagFor${job.uniqueId}`,"slideFromLeft"); } 
        });

    }  


    // Check if slider charts have entered viewport
    $(window).scroll(function () {
        checkScrollPositionForAnimation();
    });

    /*--------------------------------------------------------------------------------------------- LISTENERS */

    // print button listener
    $("#printButton").on("click",(e) => {
        window.print();
    });

    // email button listener
    $(".modal-footer").on("click",(e) => {
        e.preventDefault();
        if (e.target.id === "emailSendButton") {
            let data = {
                inputName: $("#inputName").val(),
                inputEmail: $("#inputEmail").val(),
                inputText: $("#inputText").val()
            }
            
            fetch("/email", {
                method: 'POST',
                headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => console.log(res));
        }
    });

    // big screen menu button listener
    $(".bigScreenMenuUl").on("click",(e) => {

        // remove the query string if it is there
		history.pushState('', document.title, window.location.pathname);

        // change the page title
        document.title = `${e.target.id.substr(0,1).toUpperCase()}${e.target.id.substr(1)} - Nathan Loudon`;
        
        // if the button we pressed has the active class, do nothing
        if (!$(".bigScreenMenuUl #"+e.target.id).hasClass("active")) {
        
            // hide all the main content blocks
            $(".menuItemContent").hide();

            // else reset all the menu buttons
            $(".bigScreenMenuLiButton").removeClass("active");
            $(".smallScreenMenuLiButton").removeClass("active");

            // show the main content block associated with the button pressed
            $("#"+e.target.id+"Wrapper").show();

            // add active class to the button pressed
            $(".bigScreenMenuUl #"+e.target.id).addClass("active");
            $(".smallScreenMenuUl #"+e.target.id).addClass("active");

            // reset charts
            resetChart(personalSkills);
            resetChart(software);

            // reset work tags
            workHistory.forEach((job) => {    
                resetElement(`workHistoryTagFor${job.uniqueId}`,"slideFromLeft"); 
            });

            // Check if slider charts are in viewport
            checkScrollPositionForAnimation();

        }
    });

    // mobile menu button listener
    $(".smallScreenMenuUl").on("click",(e) => {

        // remove the query string if it is there
		history.pushState('', document.title, window.location.pathname);

        // change the page title
        document.title = `${e.target.id.substr(0,1).toUpperCase()}${e.target.id.substr(1)} - Nathan Loudon`;

        // if the button we pressed has the active class, do nothing
        if (!$(".smallScreenMenuUl #"+e.target.id).hasClass("active")) {

            // hide all the main content blocks
            $(".menuItemContent").hide(); 

            // else reset all the menu buttons
            $(".smallScreenMenuLiButton").removeClass("active");
            $(".bigScreenMenuLiButton").removeClass("active");

            // else reset the menu buttons
            $("#"+e.target.id+"Wrapper").show();

            // add active class to the button pressed
            $(".smallScreenMenuUl #"+e.target.id).addClass("active");
            $(".bigScreenMenuUl #"+e.target.id).addClass("active");

            // scroll to the main content div
            $('html, body').animate({scrollTop: $("#mainContentAnchor").offset().top}, 500);

            // reset charts
            resetChart(personalSkills);
            resetChart(software);

            // reset work tags
            workHistory.forEach((job) => {    
                resetElement(`workHistoryTagFor${job.uniqueId}`,"slideFromLeft"); 
            });

            // Check if slider charts are in viewport
            checkScrollPositionForAnimation();
        }
    });

    // event listeners for the links from workHistory to portfolio page
    $(".workHistory").on("click", (e) => {
        
        // prevent the page reload
        e.preventDefault(); 
        
        // hide all the main content blocks
        $(".menuItemContent").hide();

        // else reset all the menu buttons
        $(".bigScreenMenuLiButton").removeClass("active");
        $(".smallScreenMenuLiButton").removeClass("active");

        // add active class to the portfolio button
        $("#portfolio").addClass("active");
        $("#portfolio").addClass("active");
        
        // show the appropriate content and scroll to it
        $("#portfolioWrapper").show();

        $('html, body').animate({scrollTop: $("#"+e.target.id.slice(0, -1)+"Anchor").offset().top}, 500);

        // reset charts
        resetChart(personalSkills);
        resetChart(software);

        // reset work tags
        workHistory.forEach((job) => {    
            resetElement(`workHistoryTagFor${job.uniqueId}`,"slideFromLeft"); 
        });

        // change the page title
        document.title = `Portfolio - Nathan Loudon`;

    });


    /*--------------------------------------------------------------------------------------------- RUN ON PAGE LOAD */

    

    // create slider charts
    languageSkills.forEach((skill) => {
        let html = `
            <div id="${skill.text.replaceAll(" ","-")}-Row-fadeIn-div" class="Row-fadeIn d-flex flex-wrap col-12 mt-2">
                <div class="skillTd col-12 col-sm-3 col-md-12 col-xl-4">${skill.text}</div>
                <div class="col-12 col-xs-9 col-md-12 col-xl-8">
                    <div class="skillContainer d-flex justify-content-start p-0 m-0">
                        <div id="${skill.text.replaceAll(" ","-")}-fill-div" class="skills pr-2">${skill.rating}%</div>
                    </div>
                </div>
            </div>`;
        $("#languageSkillsWrapper").append(html);
    });

    personalSkills.forEach((skill) => {
        let html = `
            <div id="${skill.text.replaceAll(" ","-")}-Row-fadeIn-div" class="Row-fadeIn d-flex flex-wrap col-12 col-md-10 mt-2">
                <div class="skillTd col-12 col-sm-12 col-md-12 col-lg-4">${skill.text}</div>
                <div class="col-12 col-sm-12 col-md-12 col-lg-8">
                    <div class="skillContainer d-flex justify-content-start p-0 m-0">
                        <div id="${skill.text.replaceAll(" ","-")}-fill-div" class="skills pr-2">${skill.rating}%</div>
                    </div>
                </div>
            </div>`;
        $("#personalSkillsWrapper").append(html);
    });

    let softwareHTML = `<div class="otherSkillsTable col-10 col-sm-12 col-md-10 col-lg-6 w-100 m-0 p-0">`;
    software.forEach((package,index) => {
        softwareHTML += `
        <div id="${package.text.replaceAll(" ","-")}-Row-fadeIn-div" class="Row-fadeIn d-flex flex-wrap col-12 w-100 m-0 p-0 mt-1">
            <div class="skillTd p-0 m-0 col-12 col-sm-4 pl-2">${package.text}</div>
            <div class="sliderTd p-0 m-0 col-12 col-sm-8">
                <div class="skillContainer d-flex justify-content-start p-0 m-0">
                    <div id="${package.text.replaceAll(" ","-")}-fill-div" class="skills pr-2" data-rating="${package.rating}"> ${package.rating}%</div>
                </div>
            </div>
        </div>`;
        if(index > 0 && index % 3 == 0) {softwareHTML += `</div><div class="otherSkillsTable col-10 col-sm-12 col-md-10 col-lg-6 w-100 m-0 p-0">`}

    });
    softwareHTML += `</div>`;
    $("#otherSkillsArticle").append(softwareHTML);

    // add work history to page
    let html=``;

    workHistory.forEach((job) => {
        html+=`
            <article class="d-flex flex-row flex-wrap justify-content-start cardContentRight col-12">
                <div class="col-12 col-sm-3 workHistoryImgHolder">
                    <div id="workHistoryTagFor${job.uniqueId}" class="workHistoryTag mt-5 ml-md-3 ml-lg-5 ">${job.year}</div>
                    <img class="mt-4 d-none d-sm-block ml-md-3 ml-lg-5" src="./assets/images/${job.image}" alt="company logo"/>
                </div>
                <div class="jobDetails col-12 col-sm-9 mb-3 mt-5 border-left">
                    <span>
                        <strong>${job.role}</strong>
                        <br>${job.employer}
                    </span>      
                    <p></p>`;
        job.tasks.forEach((task) => {
            html += `<P>${task}</P>`;
        });
        job.projects.forEach((project) => {
            html += `<p class="workHistoryProject"><strong>${project.projectTitle}</strong> - ${project.projectDescription}</p>`;
        });
        html += ` <div class="buttonHolder d-flex flex-wrap w-100 justify-content-start noPrint">`;
        job.projects.forEach((project) => {
            html += `<a  href="#" class="p-2 m-2 col-5 col-sm-8 col-md-5 col-xxl-3 border-0 button noPrint" id="${project.projectAnchorId}a"><span id="${project.projectAnchorId}s">${project.projectAnchorText}</span></a>`;
        });
        html += `</div>
            <div class="print w-100">
                <table class="w-100">`;
        job.projects.forEach((project) => {
            html += `<tr class="p-5"><td>${project.projectPrintText}</td><td>${project.projectPrintLink}</td></tr>`;
        });
        html += `</table>
                    </div>
                </div>
            </article>`; 
    });

    $("#workHistory").append(html);






    // get the query string if its there
	var url_string = window.location.href;
	var url = new URL(url_string);
	var page = url.searchParams.get("page");

    // hide all content sections
    $(".menuItemContent").hide();

    // If there is a query string
	if (page != null && page !== "undefined" && page != "" && page !== undefined ) { 
        
        // show the requested content section
		$("#"+page+"Wrapper").show();

        // reset all the menu buttons
        $(".smallScreenMenuLiButton").removeClass("active");
        $(".bigScreenMenuLiButton").removeClass("active");

        // set the appropriate button active
        $(".smallScreenMenuUl #"+page).addClass("active");
        $(".bigScreenMenuUl #"+page).addClass("active");

        // change the page title
        document.title = `${page.substr(0,1).toUpperCase()}${page.substr(1)} - Nathan Loudon`;

        // delete the query string
        history.pushState('', document.title, window.location.pathname);
	}
    else {

        // if there is no query string, load the portfolio page
        $(".bigScreenMenuUl #portfolio").click();
    }

    
    
    // Check if slider charts are in viewport
    checkScrollPositionForAnimation();


});

function onloadCallback() {
      
    grecaptcha.ready(function() {
        let siteKey = "6Ldf298gAAAAAPOMeIj62wcusoDZy9TzHDZsBTCC";

        let catpchaHTML = `    
            <div class="g-recaptcha"
                data-sitekey="${siteKey}"
                data-callback="onSubmit"
                data-size="invisible">
            </div>
        `;
        
            $("#myReCaptcha").append(catpchaHTML);
        
        $(`
        <a  href="#" class="d-block p-2 m-2 col-12 border-0 button noPrint w-100" id="loadContactDetails">
            <span>LOAD</span>
        </a>`).prependTo("#contactDetailsDiv");
        $("#loadContactDetails").on("click",(e) => {
            e.preventDefault();
            $("#contactDivSpinner").removeClass("d-none").addClass('d-flex');
            $("#loadContactDetails").removeClass("d-block").addClass('d-none');
            grecaptcha.execute(siteKey, {action: 'submit'})
            .then(function(token) {
                fetch(`/recaptcha?token=${token}`)
                .then(response => response.json())
                .then((data) => {
                    if (data.success === true) {
                        $("#contactDivSpinner").removeClass("d-flex").addClass('d-none');
                        $("#loadContactDetails").removeClass("d-block").addClass('d-none');
                        $("#contactDetailsTable").removeClass("d-none").addClass('d-block');
                        $("#phoneIcon").html("<i class='bi bi-telephone'></i>");
                        $("#phoneContent").html(data.phone); 
                        $("#emailIcon").html("<i class='bi bi-envelope'></i>");  
                        $("#emailContent").html(`<a href="#" data-toggle="modal" data-target="#mainModal">${data.email}</a>`); 
                        $("#addressIcon").html("<i class='bi bi-house'></i>"); 
                        $("#addressContent").html(`<table><tr><td>${data.addressL1}</td></tr><tr><td>${data.addressL2}</td></tr><tr><td>${data.addressL3}</td></tr>`);
                    
                        let button = `
                            <button type="button" class="button col-4" data-dismiss="modal" aria-label="Close">
                                <span>CANCEL</span>
                            </button>
                            <button type="button" class="button col-4" aria-label="Send" id="emailSendButton"><span id="emailSendButton">SEND</span></button>`;
                        let title = `
                            <h5 class="modal-title" id="mainModalLabel">EMAIL</h5>`;
                        let body = `
                            <form class="email-me" method="post">
                                <fieldset>
                                    <label class="mt-2 col-12" for="inputName">
                                        Full Name
                                        <span class="required">
                                            (required)
                                        </span>
                                        <input type="text" class="form-control col-12" id="inputName" aria-describedby="emailNathan" placeholder="Enter name">
                                    </label>
                                    <label  class="mt-2 col-12" for="inputEmail">
                                        Email
                                        <span class="required">
                                                (required)
                                        </span>
                                        <input type="email" class="form-control col-12" id="inputEmail" aria-describedby="emailNathan" placeholder="Enter email">
                                    </label>
                                </fieldset>
                                <fieldset>
                                    <label  class="mt-2 col-12" for='inputText'>
                                        Please leave your comments or questions here
                                        <span class="required">
                                            (required)
                                        </span>
                                        <textarea  class="form-control col-12"  id='inputText' required=''></textarea>
                                    </label>
                                </fieldset>
                            </form>`;
                        $(".modal-footer").html(button);
                
                        $(".modal-body").html(body);
                        $(".modal-header").html(title);

                    
                    
                    }  
                    else {
                        $("#loadContactDetails").removeClass("d-none").addClass('d-block');
                        $("#contactDivSpinner").removeClass("d-flex").addClass('d-none');
                    }     
                })
                .catch((err) => {console.log(err); });   
            });
        });
    });

}



    

