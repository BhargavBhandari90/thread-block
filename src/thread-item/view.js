import { store, getContext } from '@wordpress/interactivity';

const { state } = store( 'buntywp/thread-item', {
	state: {
		imageUrl: '',
		isOpen: false,
		get imageSrc() {
			return state.imageUrl;
		},
		get isPopupOpen() {
			return state.isOpen;
		},
	},
	actions: {
		showLightbox: () => {
			const context = getContext();
			state.imageUrl = context.imageUrl;
			state.isOpen = true;
		},
		hideLightbox: () => {
			state.imageUrl = '';
			state.isOpen = false;
		},
	},
	callbacks: {
		setupLightbox: () => {
			window.addEventListener( 'keydown', ( event ) => {
				if ( 'Escape' === event.key ) {
					store( 'buntywp/thread-item' ).actions.hideLightbox();
				}
			} );
		},
	},
} );
