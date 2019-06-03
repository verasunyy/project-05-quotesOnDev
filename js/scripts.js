//IIFE immediatley envoked function expressoion
(function ($) {
    //Document ready shorthand
    $(function () {

        let lastPage = '';
        $("#new-quote-button").on("click", getRandomQuote);
        $("#quote-submission-form").on("submit", postQuote);

        //Get Request
        function getRandomQuote(event) {
            event.preventDefault();
            lastPage = document.URL;

            $.ajax({
                method: "get",
                url: api_vars.rest_url + "/wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1",
            }).done(function (data) {
                const $title = data[0].title.rendered;
                const $content = data[0].content.rendered;
                const $quoteSource = data[0]._qod_quote_source;
                const $quoteSourceUrl = data[0]._qod_quote_source_url;
                $(".entry-content").html($content);
                $(".entry-meta .entry-title").html("&mdash; " + $title);
                if ($quoteSource && $quoteSourceUrl) {
                    $(".entry-meta .source").html(`, <a href='${$quoteSourceUrl}'>${$quoteSource}</a>`);
                } else if ($quoteSource) {
                    $(".entry-meta .source").html(`, ${$quoteSource}`);
                }
                else {
                    $(".entry-meta .source").html("");
                }
                history.pushState(null, null, data[0].slug);
            }).fail(function (error) {
                $(".fail-message").html("");
                $("article").append(`<p class="fail-message">Sorry, somthing went wrong, please try again!</p>`);
            });

            $(window).on('popstate', function () {
                window.location.replace(lastPage);
            })
        }//end of get random quote

        //Post Request
        function postQuote(event) {
            event.preventDefault();
            const $quoteAuthor = $('#quote-author').val();
            const $quoteContent = $('#quote-content').val();
            const $quoteSource = $('#quote-source').val();
            const $quoteSourceUrl = $('#quote-source-url').val();
            if ($quoteAuthor && $quoteContent) {
                postAjax();
            } else {
                console.log("fill the area")
                $(".field-required").html("");
                $("#quote-submission-form").append('<p class= "field-required">* Please fill out all the required areas</p>');
            }

            function postAjax() {
                $.ajax({
                    method: "post",
                    url: api_vars.rest_url + 'wp/v2/posts',
                    data: {
                        title: $quoteAuthor,
                        content: $quoteContent,
                        status: 'pending',
                        _qod_quote_source: $quoteSource,
                        _qod_quote_source_url: $quoteSourceUrl
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('X-WP-Nonce', api_vars.nonce);
                    }
                }).done(function () {
                    $(".entry-header").append(`<p class="success-message">Thank you for your submit! <a href=""> Click here </a>to submit another!</p>`);
                    $('#quote-submission-form').slideUp(200);
                }).fail(function () {
                    $(".fail-message").html("");
                    $("#quote-submission-form").append(`<p class="fail-message">Sorry, somthing went wrong, please try again!</p>`);
                });
            }//end of post ajax

        }//end of post quote

    });//end of doc ready

})(jQuery);