<div id="jscript-content">
    <img class="jscript-nav" id="jscript-left" src="<?php echo get_stylesheet_directory_uri(); ?>/images/carousel-nav/jscript-nav-arrow-left.png">
    <img class="jscript-nav" id="jscript-right" src="<?php echo get_stylesheet_directory_uri(); ?>/images/carousel-nav/jscript-nav-arrow-right.png">
	<?php $temp_count = 0; $featured_query = new WP_Query(array( 'category_name' => 'featured', 'posts_per_page' => 10 )); while( $featured_query->have_posts() ): $featured_query->the_post(); ?>
    	<!-- Add to the count for every loop -->
    	<?php $temp_count++; ?>
        <a href="<?php the_permalink(); ?>" title="<?php the_title_attribute(); ?>">
        	<img class="jscript-image <?php if ($temp_count == 1) echo 'jscript-active'?>" id="featured-image-<?php echo $temp_count; ?>" src="<?php the_field('featured_image_for_carousel'); ?>" />
        </a>
        <span class="jscript-title <?php if ($temp_count == 1) echo 'jscript-active'?>" id="featured-title-<?php echo $temp_count; ?>"><?php the_title(); ?></span>
    <?php endwhile; ?>
    <!-- Hide navigation if posts are less than 1 -->
    <?php if ($temp_count < 2) echo '<style>.jscript-nav, .jscript-nav-buttons { display:none; }</style>'; ?>
    <?php wp_reset_postdata(); ?>
</div>