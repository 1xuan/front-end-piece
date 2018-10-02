// Encapsulate a method that replaces getElementById()
function byId(id) {
    return typeof(id) === "string"? document.getElementById(id):id;
}

var index = 0,
    timer = null,
    pics = byId("banner").getElementsByTagName("div"),
    dots = byId("dots").getElementsByTagName("span"),
    prev = byId("prev"),
    next = byId("next"),
    len = pics.length,
    subMenu = byId("sub-menu"),
    menu = byId("menu-content"),
    innerBox = subMenu.getElementsByClassName("inner-box"),
    menuItems = menu.getElementsByClassName("menu-item");

function slideImg () {
    var main = byId("main");
    main.onmouseover = function () {
        // clear timer
        if (timer) clearInterval(timer);
    };
    main.onmouseout = function () {
        timer = setInterval(function () {
            index++;
            if (index >= len){
                index = 0
            }
            changeImg();
        }, 3000);
    };

    // Automatically trigger onmouseout events
    main.onmouseout();

    // traversal all click, and bind click events, change images by click dot
    for (var d=0; d<len; d++) {
        // add a attribute `id` for all `span`
        dots[d].id = d;
        dots[d].onclick = function () {
            // change `index` to current id of `span`
            index = this.id;
            this.className = "active";
            // invoke changeImg(), implement function of turning image
            changeImg();
        }
    }

    // next image
    next.onclick = function () {
        index++;
        if (index >= len) index = 0;
        changeImg();
    };

    // previous image
    prev.onclick = function () {
        index--;
        if (index < 0) index = len-1;
        changeImg();
    };

    // navigation menu
    // traversal main menu, and bind events
    for(var m=0; m<menuItems.length; m++) {
        menuItems[m].setAttribute("data-index", m);
        menuItems[m].onmouseover = function () {
            subMenu.className = "sub-menu";
            var idx = this.getAttribute("data-index");
            // hide all submenu
            for (var j=0; j<innerBox.length; j++) {
                innerBox[j].style.display = 'none';
                menuItems[j].style.background = 'none';
            }
            menuItems[idx].style.background = 'rgba(0, 0, 0, 0.1)';

            // display the corresponding element
            innerBox[idx].style.display = "block";
        }
    }

    menu.onmouseout = function () {
        subMenu.className = "sub-menu hide";
    };

    subMenu.onmouseover = function (){
        subMenu.className = "sub-menu";
    };

    subMenu.onmouseout = function () {
        subMenu.className = "sub-menu hide";
    };
}


// turn image
function changeImg() {
    // traversal multiple div of banner and multiple span of dots, hide div and clear span
    for (var i=0;i < len; i++){
        pics[i].style.display = "none";
        dots[i].className = "";
    }
    // set current div style and dots classname
    pics[index].style.display = 'block';
    dots[index].className = "active";
}

slideImg();