$(document).ready(function(){


m = "";
for(i=0;i<$("h1").text().split("").length;i++) {
  m+="<span>"+$("h1").text().split("")[i]+"</span>";

}

console.log($("h1 span").text())

$(".punch").hover(function(){
    $("h1 span").css({    
    "transform":"rotate(-90deg)"
  })
}, function(){
    $("h1 span").css({    
    "transform":"rotate(0deg)"
  })
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
                                    "<div class='label'>Key Themes<br />and Connections</div>"+
                                    key_themes_and_connections+
                                    additional_info+
                                "</div>" +
                                "<div class='project-bottom'>"+"<button class='makeBook' data-nid='"+nid+"'>print booklet</button>"+
                              "</div></div>" + 
                            "</div>")




              $("<li></li>")
                .attr("id","artist-"+nid)
                .append("<div class='title'>"+artist+"<div class='open-close'></div></div>")


                .append(contents)
                .appendTo("#menu")


            



    }


  });



    $(document).on("click",".title",function(){

      if ( !$(this).parent("li").hasClass("active") ) {
            $("li.active").removeClass("active");

            $(this).parent("li").addClass("active");
      } else {
        $("li.active").removeClass("active");
      }
      
    })


    $(document).on("click",".active .open-close",function(){
          setTimeout(function(){
          $(".active").removeClass("active");
        },25)
    })


//makeBook(3)

  $(document).on("click",".makeBook",function(){
    
    makeBook($(this).data("nid"))



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


function makeBook(nid) {

  
    $("#web").css({"display":"none"})

    let runningHeaders = Bindery.RunningHeader({
        render: (page) => page.isLeft ? 
        `<div class="footer">${page.number}</div><div class="punch" id="punch-06"></div><div class="punch" id="punch-07"></div><div class="punch" id="punch-08"></div><div class="punch" id="punch-09"></div>`
        : `<div class='recto-head'><span>T</span><span>o</span><span>o</span><span>l</span><span>s</span><span class="space">&nbsp;</span><span>f</span><span>o</span><span>r</span><span class="space">&nbsp;</span><span>L</span><span>e</span><span>a</span><span>r</span><span>n</span><span>i</span><span>n</span><span>g</span><br /><span>T</span><span>o</span><span>r</span><span>o</span><span>n</span><span>t</span><span>o</span><span class="space">&nbsp;</span><span>B</span><span>i</span><span>e</span><span>n</span><span>n</span><span>i</span><span>a</span><span>l</span><span class="space">&nbsp;</span><span>o</span><span>f</span><span class="space">&nbsp;</span><span>A</span><span>r</span><span>t</span></div><div class="footer">${page.number}</div><div class="punch" id="punch-10"></div><div class="punch" id="punch-11"></div><div class="punch" id="punch-12"></div><div class="punch" id="punch-13"></div>`
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

          if (page.flow.content.innerHTML.includes("\"tool-section\"")) {
            page.element.classList.add("tool-page")
        }
        
      }
    });


    Bindery.makeBook({
      content: {
        selector: '#chapter_contents',
        url: '/node/'+nid
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
        Bindery.PageBreak({ selector: 'h4', position: 'before' }),
        Bindery.FullBleedSpread({ selector: '.big-spread', continue: 'next' }),
         Bindery.FullBleedSpread({ selector: '.spread', continue: 'next' }),
        runningHeaders, boilerBreak, reverseBreak, pageClass, sectionBreak
      ],
      
    });

    Bindery.RunningHeader({
      render: (page) => page.isLeft
        ? `frip`
        : `${page.heading.h2} · ${page.number}`
    })


}
