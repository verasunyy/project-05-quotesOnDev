(function($){

    $("#toggle-status").on("click", function(event){
        event.preventDefault();
        
        //WP AJAX VERSION
        // $.ajax({
        //     method: "post",
        //     url: api_vars.ajax_url,
        //     data:{
        //         action: "qod_status_ajax",
        //         security: api_vars.status_nonce,
        //         the_post_id:api_vars.post_id
        //     }
        // }).done(function(response){
        //     alert("Success! The status has been changed.");
        // });

        $.ajax({
            method: "post",
            url: api_vars.rest_url + "wp/v2/posts/" + api_vars.post_id,
            //the thing we want to change in the post
            data:{
                post_status:'draft'
            },
            beforeSend: function(xhr){
                xhr.setRequestHeader('X-WP-Nonce', api_vars.wpapi_nonce)
            }
        }).done(function(response){
            alert("Success! The status has been changed.");
        });


    });

})(jQuery);