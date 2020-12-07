$(document).ready(function(){


$(".mmm,.mmm2").marqueeify({"speed":60});


fetch('http://fogodev.res-commune.org/json/interviews?_format=json') 
  .then(response => response.json())
  .then(p => {
    
    
     for (i=0;i<p.length;i++) {
      

        preamble = "";
        
        if (p[i].field_pream[0] != null) {
          preamble = "<h3>intro</h3>"+p[i].field_pream[0].value;
        }





     
      var images = "";

      for (j=0;j<p[i].field_images.length;j++) {


        images+="<div class='carousel-cell'><div class='img'><img src='"+p[i].field_images[j].url+"'/><div class='caption'>"+p[i].field_images[j].alt+"</div></div></div>";  
      }


      var i_pic = "";
      if (p[i].field_interviewee_i.image_style_uri != undefined) {        
        
        i_pic = "<div class='interview-pic'><img src='"+p[i].field_interviewee_i.image_style_uri[1].medium+"' /></div>";
      }


        
      var site = "";
        if (p[i].field_interviewee_websi.uri != undefined) {
          u = p[i].field_interviewee_websi.uri.replace("https://","").replace("http://","")
          u = u.replace("www.","")
          site = "<div class='interviewee-site'><a href='"+p[i].field_interviewee_websi.uri+"' target='_blank'>"+u+"</a></div>";
      }

      var insta="";

      
       if (p[i].field_interv[0] != undefined) {
         
          u = p[i].field_interv[0].uri.replace("https://","")
        
          u = u.replace("www.","")        
        
          insta = "<div class='interviewee-insta'><a href='"+p[i].field_interv.uri+"' target='_blank'>"+u+"</a></div>";
        
      }


        var bio = "";

        
        if (p[i].field_interviewee_bio[0] != undefined) {
          bio = p[i].field_interviewee_bio[0].value;
        }

        var disabled = "";

      var body = ""
      
      if (p[i].body[0] != undefined) {        
        
        

       body = "<div class='contents'>"+
                          preamble+
                       
                          "<h3>interview</h3>"+

                          p[i].body[0].value+                  


                          "<div class='interviewee-info'>"+
                            i_pic+
                            bio+
                            site+
                            insta+
                          "</div>"+
                       "</div>";


      } else {
        disabled = "disabled";
      }

      subtitle = "";
      if (p[i].field_subtitle[0] != null) {
        subtitle = p[i].field_subtitle[0].value;
      }


      
       var section=   "<li id='section"+p[i].nid[0].value+"' class="+disabled+">"+
                        "<div class='title'>"+
                        "<div class='name'>"+p[i].title[0].value+"</div>"+
                          
                          "<div class='launch-date'>"+p[i].field_launch_date[0].value+"</div>"+
                          "<div class='subtitle'>"+subtitle+"</div>"+
                       "</div>"+
                       "<div class='main-carousel'>"+
                        images+
                        "</div>"+
                        body+
                    "</li>"

      $("#interview-space").append(section);

            setTimeout(function(){
              $('.main-carousel').flickity({
                // options
                cellAlign: 'left',
                contain: true,
                wrapAround: true
              });
            },500)
    

    }
  })



$(".pull").each(function(){
  id = $(this).data("id");

    fetch('http://fogodev.res-commune.org/jsonapi/node/page/'+id) 
  .then(response => response.json())
  .then(p => {
    //console.log(p)
    
    $(this).find(".contents").html(p.data.body.value)  
    

    
  })

})




  $(document).on("click","#t1logo ",function(){
    $("li.active").removeClass("active");
  })


    $(document).on("click",".title",function(){

      if (( !$(this).parent("li").hasClass("active") )  && (!$(this).parent("li").hasClass("disabled"))) {
            $("li.active").removeClass("active");
            $(this).parent("li").addClass("active");

            nid = $(this).parent("li").attr("id").replace("section-","");

            title = $("#"+nid+" .name").text();
            console.log(title)
            window.history.pushState("object or string", "Plug In Editions Online | "+title, "/?entry="+nid);
          $("title").text("Plug In Editions Online | "+title)
            
            // 
            setTimeout(function(){
            
              $(document).scrollTo("#"+nid,300)
            },50)


      } else {
        $("li.active").removeClass("active");
        
        window.history.pushState("object or string", "Plug In Editions Online", window.location.href.split("?")[0]);
      }
      
    })


    $(document).on("click",".active .open-close",function(){
          $(document).scrollTo(0,200)
          setTimeout(function(){
            $(".active").removeClass("active");
        },200)
          window.history.pushState("fff","","/")


    })






})





var url = new URL(window.location.href);

 if (url.searchParams.get("entry") != undefined) {
  a = "#"+url.searchParams.get("entry");
  
  setTimeout(function(){
  $(a).addClass("active");
  $(document).scrollTo(a,"200")

},500);
}



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
