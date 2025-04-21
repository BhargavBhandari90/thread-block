<?php
/**
 * Plugin Name:       Thread Block
 * Description:       Example static block scaffolded with Create Block tool.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            BuntyWP
 * Author URI:        https://biliplugins.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       thread-block
 *
 * @package           thread-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! defined( 'BWPTB_VERSION' ) ) {
	/**
	 * The version of the plugin.
	 */
	define( 'BWPTB_VERSION', '1.0.0' );
}

if ( ! function_exists( 'buntywp_thread_block_init' ) ) {
	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	function buntywp_thread_block_init() {
		register_block_type( __DIR__ . '/build/threads-box' );
		register_block_type( __DIR__ . '/build/thread-item' );
	}
}
add_action( 'init', 'buntywp_thread_block_init' );

/**
 * Enqueue assets for the block editor.
 *
 * @return void
 */
function buntywp_thread_block_enqueue_assets() {

	$plugin_url = plugin_dir_url( __FILE__ );

	wp_enqueue_script(
		'buntywp-thread-block-editor-script',
		plugins_url( 'build/thread-item/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ),
		BWPTB_VERSION,
		true
	);

	wp_localize_script(
		'buntywp-thread-block-editor-script',
		'BWPThread',
		array(
			'defaultImage' => $plugin_url . 'assets/image/100.svg',
		)
	);
}

add_action( 'enqueue_block_editor_assets', 'buntywp_thread_block_enqueue_assets' );
