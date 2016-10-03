<?php
/**
 * Plugin Name: CoralCharts
 * Plugin URI:
 * Description: Add google charts to pages.
 * Version: 0.0.2
 * Author: Szymon Sobczak
 * Author URI: http://coralnotes.com
 * License: MIT
 */

function chatr_handler_func( $atts ) {
    $a = shortcode_atts( array(
        'cells' => 'A1:A2',
        'unit' => '℃',
        'color' => 'rgb(228, 144, 46)',
	'label' => '',
    ), $atts );

    return '<div class="chart_div" data-cells="'.$a['cells'].'" data-unit="'.$a['unit'].'" data-bar-color="'.$a['color'].'" data-label="'.$a['label'].'"></div>';
}

add_shortcode( 'chart', 'chatr_handler_func' );

function wptuts_scripts_with_jquery() {
  	wp_register_script( 'tables', plugins_url( '/scripts/tables.js', __FILE__ ), array( 'jquery' ) );
  	wp_enqueue_script(  'tables' );

  	wp_enqueue_script('google-charts', '//www.gstatic.com/charts/loader.js');
}
add_action( 'wp_enqueue_scripts', 'wptuts_scripts_with_jquery' );
