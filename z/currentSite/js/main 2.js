$(document).ready(function(){


m = "";
for(i=0;i<$("h1").text().split("").length;i++) {
  m+="<span>"+$("h1").text().split("")[i]+"</span>";

}

console.log($("h1 span").text())

$(".punch").hover(function(){
    $("#TBA-title span").css({"transform":"rotate(-90deg)"})
    $("#T4L-title span").css({"transform":"rotate(0)"})
}, function(){
    $("#TBA-title span").css({"transform":"rotate(0deg)"})
    $("#T4L-title span").css({"transform":"rotate(-90deg)"})
})



fetch('pages') 
  .then(response => response.json())
  .then(p => {
    for (i=0;i<p.length;i++) {
      let id = ".nid-"+p[i].nid;
      console.log(id)
      //console.log(p[i].body)
      $(id+ " .two-cols").html(p[i].body)

      let reverse_sections = p[i].field_reverse_sections.split("|");

      for (j=0;j<reverse_sections.length;j++) {

        $(id+ " .section-reverse").append("<div class=\"reverse\">"+reverse_sections[i]+"</div>")
      }



    }
  })


fetch('data')
  .then(response => response.json())
  .then(data => {
    
    
    for (i=0;i<data.length;i++) {

      var artist = "";
      var artist_and_bio = "";
      var bio = " <em>("+data[i].field_artist_bio.split("|")[0]+")</em>";

      for (j=0;j<data[i].field_artist_name.split("|").length;j++) {
        if (j>0) { 
          artist_and_bio+=" and "
          artist+=" and ";
          // bio += "<br />" ;
        }
        artist += data[i].field_artist_name.split("|")[j];
        artist_and_bio+=data[i].field_artist_name.split("|")[j]+bio;
        

      }



      var artwork_title = ""; 
      var plural = ""
      for (var k=0;k<data[i].field_artwork_title.split("|").length; k++) {
        artwork_title += "<li class='at'>"+data[i].field_artwork_title.split("|")[k]+"</li>"
        if (k > 0) plural = "s"
      }
      
      var medium = data[i].field_medium
      var location = data[i].field_location
      var project_description = data[i].field_project_description

      var tool_title = data[i].field_tool_title;
      var tool_text = data[i].field_tool_text;

      var thumbnail = data[i].field_thumbnail;
      //console.log(data[i].field_thumbnail_2)
      //console.log(data[i].field_thumbnail_1)
      var thumbnail_web = "<div class='image-container'><img class='thumnail-image' src="+data[i].field_thumbnail_1+" data-thumbswap="+data[i].field_thumbnail_2+"><div class='image-cover'></div></div>";

      var thumbnail_caption = data[i].field_thumbnail_caption;
      
      var questions_and_conversation = data[i].field_questions_and_conversation;
      var additional_info = data[i].field_additional_info;

      var key_themes_and_connections = data[i].field_key_themes_and_connections
      var nid = data[i].nid;

  





      // console.log(artist)
      // console.log(artist_and_bio)
      // console.log(artwork_title)
      // console.log(medium)
      // console.log(location)
      // console.log(project_description)
      // console.log(questions_and_conversation)
      // console.log(tool_title)
      // console.log(tool_text)
      // console.log(thumbnail)
      // console.log(thumbnail_web)
      // console.log(thumbnail_caption)
      // console.log(key_themes_and_connections)


  var contents = $("<div class='contents'></div>")

              contents
                  .append("<div class='full-tool'>" + 
                              
                                "<div class='project-left'><div class='bio'>"+bio+'</div>' +
                                "<button class='makeBook' data-nid='"+nid+"' data-section='#chapter_contents'>print tool</button>"+
                                "<div class='workTitle'>"+
                                    "<div class='label'>Work"+plural+"</div>" +
                                    artwork_title+
                                "</div>" + 

                                "<div class='location'>"+
                                  "<div class='label'>Location</div>"+
                                  location+
                                '</div>' +

                                //"<div class='medium'>"+medium+'</div>' +

                                "<div class='thumbnail_container'>" + 
                                    thumbnail_web +
                                    "<div class='caption'>"+thumbnail_caption+'</div>' +
                                "</div>"+

                                "<div class='projectDescription'>"+
                                    "<div class='label'>Project Description</div>" +
                                    project_description+
                                '</div>' + 
                              '</div>' +
                              "<div class='project-right'>" +
                                "<div class='toolTitle'>"+
                                      "<div class='label'>Tool: "+tool_title+"</div>" + 

                                '</div>' +
                                "<div class='toolText'>"+tool_text+'</div>' +


                                "<div class='qsAndStarters'>"+
                                    "<div class='label'>Questions and <br />Conversation Starters</div>"+
                                    questions_and_conversation+
                                '</div>' +
                                "<div class='curricularConnections'>"+
                                    "<div class='label'>Keywords and<br />Connections</div>"+
                                    key_themes_and_connections+
                                    additional_info+
                                "</div>" +
                                "<div class='project-bottom'>"+
                                //"<button class='makeBook' data-nid='"+nid+"' data-section='#boilerplate'>make boilerplate book</button><br />"+
                                
                              "</div></div>" + 
                            "</div>")




              $("<li></li>")
                .attr("id","section-"+nid)
                .append("<div class='title'>"+artist+"<div class='open-close'></div></div>")


                .append(contents)
                .appendTo("#artist-space")


            



    }


  });



    $(document).on("click",".title",function(){

      if ( !$(this).parent("li").hasClass("active") ) {
            $("li.active").removeClass("active");

            $(this).parent("li").addClass("active");
            nid = $(this).parent("li").attr("id").replace("section-","");

            window.history.pushState("object or string", "Page Title", "/?entry="+nid);

             //document.location.href = setUrlParameter(window.location.href, "entry", nid)





      } else {
        $("li.active").removeClass("active");
      }
      
    })


    $(document).on("click",".active .open-close",function(){
          setTimeout(function(){
          $(".active").removeClass("active");
        },25)
          window.history.pushState("fff","","/")
    })



  $(document).on("click",".makeBook",function(){
    
    makeBook($(this).data("nid"), $(this).data("section"))

    //makeBook($(this).data("nid"), ".view-display-id-page_1")

 

})
  


$(document).on("mouseenter",".image-cover",function(){
    
    img = $(this).parent(".image-container").find(".thumnail-image")
    f = img.attr("src")
    img.attr("src",img.attr("data-thumbswap"))

    img.attr("data-thumbswap",f)
    
})

$(document).on("mouseleave",".image-cover",function(){
    
    img = $(this).parent(".image-container").find(".thumnail-image")
    f = img.attr("src")
    img.attr("src",img.attr("data-thumbswap"))

    img.attr("data-thumbswap",f)
    
})



})





var url = new URL(window.location.href);

if (url.searchParams.get("book") != undefined) {
    makeBook(url.searchParams.get("book"),".view-display-id-page_1");
} else if (url.searchParams.get("entry") != undefined) {
  a = "#section-"+url.searchParams.get("entry");
  //console.log(a)
  setTimeout(function(){
  $(a).addClass("active");
},500);
}



function makeBook(nid, section) {
  if (section == undefined) {
    section = "#chapter_contents";
  }
  
    $("#web").css({"display":"none"})

    let runningHeaders = Bindery.RunningHeader({      
        render: (page) => 
        ((page.isLeft) && (page.section != "tool")) //BOILERPLATE and LEFT
            ?  
              `<div class="footer">${page.number}</div><div class="punch" id="punch-06"></div><div class="punch" id="punch-07"></div><div class="punch" id="punch-08"></div><div class="punch" id="punch-09"></div>`
            : 
              (((page.isRight) && (page.section != "tool")) //BOILERPLATE and RIGHT
                ? 
                  `<div class='recto-head'><span>T</span><span>o</span><span>o</span><span>l</span><span>s</span><span class="space">&nbsp;</span><span>f</span><span>o</span><span>r</span><span class="space">&nbsp;</span><span>L</span><span>e</span><span>a</span><span>r</span><span>n</span><span>i</span><span>n</span><span>g</span><br /><span>T</span><span>o</span><span>r</span><span>o</span><span>n</span><span>t</span><span>o</span><span class="space">&nbsp;</span><span>B</span><span>i</span><span>e</span><span>n</span><span>n</span><span>i</span><span>a</span><span>l</span><span class="space">&nbsp;</span><span>o</span><span>f</span><span class="space">&nbsp;</span><span>A</span><span>r</span><span>t</span></div><div class="footer">${page.number}</div><div class="punch" id="punch-10"></div><div class="punch" id="punch-11"></div><div class="punch" id="punch-12"></div><div class="punch" id="punch-13"></div>`
                : (((page.isRight) && (page.section == "tool")) //TOOL and RIGHT
                  ?
                    `<div class='tool-recto-head head-${Math.floor(Math.random()*4)}'>Toronto Biennial of Art ${page.number}</div><div class="punch" id="punch-10"></div><div class="punch" id="punch-11"></div><div class="punch" id="punch-12"></div><div class="punch" id="punch-13"></div>` 
                  :  //TOOL and LEFT
                    `<div class='tool-verso-head head-${Math.floor(Math.random()*4)}'>${page.number} Tools for Learning</div><div class="punch" id="punch-06"></div><div class="punch" id="punch-07"></div><div class="punch" id="punch-08"></div><div class="punch" id="punch-09"></div>`

                  )
                )








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

        if (page.number >= 11) {
            page.section = "tool"
            page.element.classList.add("tool-page")

        }
        
      }
    });


    Bindery.makeBook({
      content: {
        selector: section,
        //url: '/node/'+nid
        url:'/boilerplate'
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
        Bindery.PageBreak({ selector: '.tool', position: 'before' }),
        Bindery.PageBreak({ selector: '.works', position: 'avoid' }),
        Bindery.PageBreak({ selector: '.location', position: 'avoid' }),
        Bindery.PageBreak({ selector: '.questions', position: 'avoid' }),
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


      
    },1500)



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
