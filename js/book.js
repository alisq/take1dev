

setTimeout(function(){



    

var url = new URL(window.location.href);



if (url.searchParams.get("nid") != undefined) {

    $("body").addClass("tool-book")
    makeBook(url.searchParams.get("nid"),".view-display-id-page_1");
} else if (window.location.href.includes("full-book")) {
    makeBigBook("/all-tools",".view-id-all_tools")

} else {
  $("body").addClass("boilerplate-book")
    makeBoilerBook("/boilerplate",".view-display-id-page_1");
}

},500)


function makeBook(nid) {
    let runningHeaders = Bindery.RunningHeader({      

        render: (page) => (page.isRight)
                  ?
                    `<div class='tool-recto-head head-${Math.floor(Math.random()*4)}'><div class='run-tba'>Toronto Biennial of Art </div><div class='run-t4l'>Tools for Learning</div><div class='run-url'>torontobiennial.org</div></div><div class="punch" id="punch-10"></div><div class="punch" id="punch-11"></div><div class="punch" id="punch-12"></div><div class="punch" id="punch-13"></div>` 
                  :  //TOOL and LEFT ${page.number}
                    `<div class='tool-verso-head head-${Math.floor(Math.random()*4)}'><div class='run-tba'>Toronto Biennial of Art </div><div class='run-t4l'>Tools for Learning</div><div class='run-url'>torontobiennial.org</div><div class="punch" id="punch-06"></div><div class="punch" id="punch-07"></div><div class="punch" id="punch-08"></div><div class="punch" id="punch-09"></div>`

         


    }); 




    // Set the background hue by % through book
    let pageClass = Bindery.createRule({
      eachPage: function(page, book) {
        let pct = page.number / book.pageCount;
          page.element.classList.add("num-"+page.number)
          page.element.classList.add("tool-page")        
          page.element.classList.add("tool-"+nid)
      }
    });


    Bindery.makeBook({
      content: {
        selector: ".tool-section",
        url: '/node/'+nid
        
      },
        view: Bindery.View.PREVIEW,
          pageSetup: {  
        size: { width: '5.5in', height: '8.5in' },
        margin: { top: '1in', inner: '0.75in', outer: '0.625in', bottom: '0.025in' },
        //margin: { top: '1in', inner: '1.175in', outer: '0.625in', bottom: '0.375in' },
        
      },
      printSetup: {
        layout: Bindery.Layout.BOOKLET,
        paper: Bindery.Paper.LETTER_LANDSCAPE,
      },
      rules: [
        //Bindery.PageBreak({selector: '#boilerplate', continue: 'left' }),
        Bindery.PageBreak({ selector: 'h4', position: 'before' }),
        Bindery.PageBreak({ selector: '.book-tool-title', position: 'after' }),
        Bindery.FullBleedPage({ selector: '.inward', continue: 'next', rotate: 'inward' }),
        //Bindery.PageBreak({ selector: '.tool', position: 'before' }),
        Bindery.PageBreak({ selector: '.works', position: 'avoid' }),
        Bindery.PageBreak({ selector: '#tba-logo-svg', position: 'before' }),
        Bindery.PageBreak({ selector: '.break-after', position: 'after' }),
        Bindery.PageBreak({ selector: '.location', position: 'avoid' }),
        Bindery.PageBreak({ selector: '.location', position: 'avoid' }),
        Bindery.PageBreak({ selector: '.questions', position: 'avoid' }),
        Bindery.PageBreak({ selector: '.bibliography li', position: 'avoid' }),
        
        //Bindery.FullBleedSpread({ selector: '.big-spread', continue: 'next' }),
        Bindery.FullBleedSpread({ selector: '.spread', continue: 'next' }),
        pageClass, runningHeaders, 
      ],
      
    });


    setTimeout(function(){
      $(".artist").each(function(){
            var r = Math.floor(Math.random()*20)-10;
            $(this).css("transform","rotate("+r+"deg)")

      })


      
    },1500)



} //END OF MAKEBOOK.



function makeBoilerBook() {
    let runningHeaders = Bindery.RunningHeader({      
        render: (page) => (page.isLeft)  //BOILERPLATE and LEFT
            ?  
              `<div class="footer">${page.number}</div><div class="punch" id="punch-06"></div><div class="punch" id="punch-07"></div><div class="punch" id="punch-08"></div><div class="punch" id="punch-09"></div>`
            : 
              `<div class='recto-head'><span>T</span><span>o</span><span>o</span><span>l</span><span>s</span><span class="space">&nbsp;</span><span>f</span><span>o</span><span>r</span><span class="space">&nbsp;</span><span>L</span><span>e</span><span>a</span><span>r</span><span>n</span><span>i</span><span>n</span><span>g</span><br /><span>T</span><span>o</span><span>r</span><span>o</span><span>n</span><span>t</span><span>o</span><span class="space">&nbsp;</span><span>B</span><span>i</span><span>e</span><span>n</span><span>n</span><span>i</span><span>a</span><span>l</span><span class="space">&nbsp;</span><span>o</span><span>f</span><span class="space">&nbsp;</span><span>A</span><span>r</span><span>t</span></div><div class="footer">${page.number}</div><div class="punch" id="punch-10"></div><div class="punch" id="punch-11"></div><div class="punch" id="punch-12"></div><div class="punch" id="punch-13"></div>`

    }); 

    let boilerBreak = Bindery.PageBreak({
      selector: '.question',
      position: 'before',
      continue: 'left'
    })

    let reverseBreak = Bindery.PageBreak({
      selector: '.reverse',
      position: 'both'
    })


    let sectionBreak = Bindery.PageBreak({
      selector: '.tool-section',
      position: 'before',
      continue: 'left'
    })


    // Set the background hue by % through book
    let pageClass = Bindery.createRule({
      eachPage: function(page, book) {
        let pct = page.number / book.pageCount;
          page.element.classList.add("num"+page.number)
        
          if (page.flow.content.innerHTML.includes("\"reverse\"")) {
            page.element.classList.add("reverse-page")
        }

        
      }
    });


    Bindery.makeBook({
      content: {
        selector: ".view-display-id-page_1",
        //url: '/node/'+nid
        url:"/boilerplate"
      },
        view: Bindery.View.PREVIEW,
          pageSetup: {  
        size: { width: '5.5in', height: '8.5in' },
        margin: { top: '1in', inner: '0.625in', outer: '0.375in', bottom: '0.375in' },
        
      },
      printSetup: {
        layout: Bindery.Layout.BOOKLET,
        paper: Bindery.Paper.LETTER_LANDSCAPE,
      },
      rules: [
        //Bindery.PageBreak({selector: '#boilerplate', continue: 'left' }),
        Bindery.PageBreak({ selector: 'h4', position: 'before' }),
        Bindery.PageBreak({ selector: 'h4', position: 'after' }),
        Bindery.PageBreak({ selector: '.tool', position: 'before' }),
        Bindery.PageBreak({ selector: '#tba-tfl-svg', position: 'before' }),
        Bindery.PageBreak({ selector: '.works', position: 'avoid' }),
        Bindery.PageBreak({ selector: '.location', position: 'avoid' }),
        Bindery.PageBreak({ selector: '.questions', position: 'avoid' }),
        Bindery.PageBreak({ selector: '.bibliography li', position: 'avoid' }),
        
        //Bindery.FullBleedSpread({ selector: '.big-spread', continue: 'next' }),
        Bindery.FullBleedSpread({ selector: '.spread', continue: 'next' }),
        pageClass, runningHeaders, boilerBreak, reverseBreak, sectionBreak
      ],
      
    });


    setTimeout(function(){
      $(".artist").each(function(){
            var r = Math.floor(Math.random()*20)-10;
            $(this).css("transform","rotate("+r+"deg)")

      })

      $(".reverse").css({"min-height":"7.1in"})


      
    },1500)



} //END OF MAKEBOOK.







function makeBigBook() {
   makeBoilerBook("/boilerplate",".view-display-id-page_1");
   
   


} //END OF MAKEBOOK.




function setUrlParameter(url, key, value) {
    var key = encodeURIComponent(key),
        value = encodeURIComponent(value);

    var baseUrl = url.split('?')[0],
        newParam = key + '=' + value,
        params = '?' + newParam;

    if (url.split('?')[1] === undefined){ // if there are no query strings, make urlQueryString empty
        urlQueryString = '';
    } else {
        urlQueryString = '?' + url.split('?')[1];
    }

    // If the "search" string exists, then build params from it
    if (urlQueryString) {
        var updateRegex = new RegExp('([\?&])' + key + '[^&]*');
        var removeRegex = new RegExp('([\?&])' + key + '=[^&;]+[&;]?');

        if (value === undefined || value === null || value === '') { // Remove param if value is empty
            params = urlQueryString.replace(removeRegex, "$1");
            params = params.replace(/[&;]$/, "");
            
        } else if (urlQueryString.match(updateRegex) !== null) { // If param exists already, update it
            params = urlQueryString.replace(updateRegex, "$1" + newParam);
            
        } else if (urlQueryString == '') { // If there are no query strings
            params = '?' + newParam;
        } else { // Otherwise, add it to end of query string
            params = urlQueryString + '&' + newParam;
        }
    }

    // no parameter was set so we don't need the question mark
    params = params === '?' ? '' : params;

    return baseUrl + params;
}
