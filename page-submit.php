<?php
/**
 * The template for displaying all pages.
 *
 * @package QOD_Starter_Theme
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
            <section class="quote-submission">
                <header class="entry-header">
                    <?php the_title('<h1 class="entry-title">',' a Quote</h1>'); ?>
                </header>

                <?php if(is_user_logged_in() && current_user_can('edit_posts')): ?>
                <div class="quote-submission-wrapper">
                    <form name="quoteForm" id="quote-submission-form">
                        <div>
                            <label for="quote-author">Author of Quote<span class="required">*</span></label>
                            <!-- name quote_author is underscore because it will be run at back-end -->
                            <input type="text" name="quote_author" id="quote-author">
                        </div>
                        <div>
                            <label for="quote-content">Quote<span class="required">*</span></label>
                            <textarea rows="3" colums="5" name="quote_content" id="quote-content"></textarea>
                        </div>
                        <div>
                            <label for="quote-source">Where did you find this quote? (e.g. book name)</label>
                            <input type="text" name="quote_source" id="quote-source">
                        </div>
                        <div>
                            <label for="quote-source-url">Provide the URL of the quote source, if available</label>
                            <input type="url" name="quote_source_url" id="quote-source-url">
                        </div>
                        <input type="submit" value="Submit Quote">
                    </form>
                    
                    <!-- use jquery to .slideup()????? -->
                    <p class="submit-success-message" style="display:none;">Thanks for the awosome quote.</p>
                </div>
                <?php else: ?>
                <p>Sorry, you must log in to submit a quote.</p>
                <a href="<?php echo wp_login_url(); ?>">Click here to login.</a>
                <?php endif; ?>
            </section>

		</main><!-- #main -->
	</div><!-- #primary -->

<?php get_footer(); ?>
