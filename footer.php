<?php
/**
 * The template for displaying the footer.
 *
 * @package QOD_Starter_Theme
 */

?>

			</div><!-- #content -->

			<footer id="colophon" class="site-footer" role="contentinfo">
			<nav id="site-navigation" class="main-navigation" role="navigation">
					
					<span><?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_id' => 'primary-menu' ) ); ?></span>
					<span>Brought to you by <a href="https://github.com/verasunyy">Vera Sun</a></span>
				</nav><!-- #site-navigation -->
				
			</footer><!-- #colophon -->
		</div><!-- #page -->

		<?php wp_footer(); ?>

	</body>
</html>
