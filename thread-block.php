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

if ( ! function_exists( 'buntywp_thread_block_block_init' ) ) {
	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	function buntywp_thread_block_block_init() {
		register_block_type( __DIR__ . '/build/threads-box' );
		register_block_type( __DIR__ . '/build/thread-item' );
	}
}
add_action( 'init', 'buntywp_thread_block_block_init' );
