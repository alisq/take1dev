$(document).ready(function(){


//$(".mmm,.mmm2").marqueeify({"speed":60});


fetch('http://fogodev.res-commune.org/jsonapi/node/interview?include=field_images,field_interviewee_i') 
  .then(response => response.json())
  .then(p => {
    
    
     for (i=0;i<p.data.length;i++) {
      



      preamble = "";
      if (p.data[i].field_pream != undefined) {
        preamble = "<h3>intro</h3>"+p.data[i].field_pream.value;
      }





     
      var images = "";

      for (j=0;j<p.data[i].field_images.length;j++) {
        images+="<div class='carousel-cell'><div class='img'><img src='"+p.data[i].field_images[j].image_style_uri[0].large+"'/><div class='caption'>"+p.data[i].field_images[j].meta.alt+"</div></div></div>";  
      }


      var i_pic = "";
      if (p.data[i].field_interviewee_i.image_style_uri != undefined) {        
        
        i_pic = "<div class='interview-pic'><img src='"+p.data[i].field_interviewee_i.image_style_uri[1].medium+"' /></div>";
      }


      var site = "";
        if (p.data[i].field_interviewee_websi != null) {
          u = p.data[i].field_interviewee_websi.uri.replace("https://","")
          u = u.replace("www.","")
          site = "<div class='interviewee-site'><a href='"+p.data[i].field_interviewee_websi.uri+"' target='_blank'>"+u+"</a></div>";
      }

      var insta="";


       if (p.data[i].field_interv != null) {
          u = p.data[i].field_interv.uri.replace("https://","")
        
          u = u.replace("www.","")        
        
          insta = "<div class='interviewee-insta'><a href='"+p.data[i].field_interv.uri+"' target='_blank'>"+u+"</a></div>";
        
      }


        var bio = "";
        if (p.data[i].field_interviewee_bio != undefined) {
          bio = p.data[i].field_interviewee_bio.value;
        }

        var disabled = "";

      var body = ""
      
      if (p.data[i].body != undefined) {        
        
        

       body = "<div class='contents'>"+
                          preamble+
                       
                          "<h3>interview</h3>"+

                          p.data[i].body.value+                  


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
      if (p.data[i].field_subtitle != null) {
        subtitle = p.data[i].field_subtitle;
      }

       var section=   "<li id='section"+p.data[i].drupal_internal__nid+"' class="+disabled+">"+
                        "<div class='title'>"+
                          p.data[i].title+
                          
                          "<div class='launch-date'>"+p.data[i].field_launch_date+"</div>"+
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
            window.history.pushState("object or string", "Page Title", "/?entry="+nid);
            $(document).scrollTo("#"+$(this).parent("li").attr("id"),200)



      } else {
        $("li.active").removeClass("active");
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
  console.log(a)
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
