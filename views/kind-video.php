<?php
/*
 * Video Template
 *
 */

$mf2_post    = new MF2_Post( get_the_ID() );
$videos      = get_attached_media( 'video', get_the_ID() );
$photos      = get_attached_media( 'image', get_the_ID() );
$first_photo = array_pop( array_reverse( $photos ) );
$cite        = $mf2_post->fetch();
if ( ! $cite ) {
	$cite = array();
}
$url   = ifset( $cite['url'] );
$embed = self::get_embed( $url );
if ( ! $videos && ! $embed ) {
        $embed = wp_video_shortcode(
                array(
                        'class' => 'wp_video-shortcode u-video',
                        'src' => $url,
                )
        );
}

?>
<section class="response">
<header>
<?php
echo Kind_Taxonomy::get_before_kind( 'video' );
if ( isset( $cite['name'] ) ) {
	echo sprintf( '<span class="p-name">%1s</a>', $cite['name'] );
}

?>
</header>
</section>
<?php
if ( $videos && ! has_post_thumbnail( get_the_ID() ) ) {

	$poster = wp_get_attachment_image_src( $first_photo->ID, 'full' );
	$poster = $poster[0];

	echo wp_video_shortcode(
		array(
			'poster' => $poster,
			'class'  => 'wp-video-shortcode u-video',
			'autoplay' => get_option('kind_video_autoplay',false),
			'loop' => get_option('kind_video_loop',false),
		)
	);
} else {
	if ( $embed ) {
		echo sprintf( '<blockquote class="e-summary">%1s</blockquote>', $embed );
	}
}
?>
<?php
