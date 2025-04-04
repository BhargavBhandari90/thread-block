import { __ } from '@wordpress/i18n';
import {
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from '@wordpress/block-editor';
import { Button, Popover, ButtonGroup } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { media, close, dragHandle, image, video } from '@wordpress/icons';
// import {
// 	DndContext,
// 	closestCenter,
// 	useSensor,
// 	useSensors,
// } from '@dnd-kit/core';
// import {
// 	arrayMove,
// 	SortableContext,
// 	verticalListSortingStrategy,
// } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const DEFAULT_IMAGE = 'https://placehold.co/100';

export default function Threaditem( {
	thread,
	index,
	updateThread,
	removeThread,
	threads,
	atts,
} ) {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable( { id: thread.id } );

	const [ isMediaPopoverVisible, setIsMediaPopoverVisible ] =
		useState( false );

	const style = {
		transform: CSS.Transform.toString( transform ),
		transition,
	};

	const addThreadImage = ( mediaObj ) => {
		// Create a new images array if it doesn't exist
		const imagesArray = thread.threadImages
			? [ ...thread.threadImages ]
			: [];

		imagesArray.push( {
			id: mediaObj.id,
			url: mediaObj.url,
			alt: mediaObj.alt || '',
		} );

		updateThread( index, 'threadImages', imagesArray );
		setIsMediaPopoverVisible( false );
	};

	const removeThreadImage = ( imageIndex ) => {
		const imagesArray = [ ...( thread.threadImages || [] ) ];
		imagesArray.splice( imageIndex, 1 );
		updateThread( index, 'threadImages', imagesArray );
	};

	return (
		<>
			<div
				ref={ setNodeRef }
				style={ style }
				{ ...attributes }
				{ ...listeners }
				className="thread-section"
			>
				<Button
					className="drag-thread"
					variant="tertiary"
					icon={ dragHandle }
					label={ __( 'Drag to reorder', 'thread-block' ) }
				></Button>
				<div className="thread-item-left">
					{ index !== threads.length - 1 && (
						<div
							className="thread-line"
							style={ {
								borderLeft: `${ atts.threadLineWidth } ${ atts.threadLineType } ${ atts.threadLineColor }`,
							} }
						></div>
					) }
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								updateThread( index, 'imageUrl', media.url )
							}
							allowedTypes={ [ 'image' ] }
							render={ ( { open } ) => (
								<>
									<img
										src={ thread.imageUrl || DEFAULT_IMAGE }
										alt="Thread"
									/>
									<Button
										icon={ media }
										variant="tertiary"
										{ ...attributes }
										{ ...listeners }
										onPointerDown={ ( event ) =>
											event.stopPropagation()
										}
										onClick={ open }
										className="thread-image-upload"
									></Button>
								</>
							) }
						/>
					</MediaUploadCheck>
				</div>
				<div className="thread-item-right">
					<RichText
						tagName="p"
						value={ thread.content }
						{ ...attributes }
						{ ...listeners }
						onPointerDown={ ( event ) => event.stopPropagation() }
						onChange={ ( newContent ) => {
							updateThread( index, 'content', newContent );
						} }
						placeholder="Enter text..."
					/>
					{ thread.threadImages && thread.threadImages.length > 0 && (
						<div className="thread-images-grid">
							{ thread.threadImages.map(
								( imageItem, imageIndex ) => (
									<div
										key={ imageIndex }
										className="thread-image-item"
									>
										<div className="thread-image">
											<img
												src={ imageItem.url }
												alt={ imageItem.alt }
											/>
										</div>
										<Button
											icon={ close }
											variant="tertiary"
											onClick={ ( e ) => {
												e.stopPropagation();
												removeThreadImage( imageIndex );
											} }
											onPointerDown={ ( event ) =>
												event.stopPropagation()
											}
											className="remove-image-button"
											isDestructive
										/>
									</div>
								)
							) }
						</div>
					) }

					<div className="thread-image-actions">
						<MediaUploadCheck>
							<MediaUpload
								onSelect={ ( media ) => {
									if ( Array.isArray( media ) ) {
										const imagesArray = thread.threadImages
											? [ ...thread.threadImages ]
											: [];

										media.forEach( ( mediaItem ) => {
											imagesArray.push( {
												id: mediaItem.id,
												url: mediaItem.url,
												alt: mediaItem.alt || '',
											} );
										} );

										updateThread(
											index,
											'threadImages',
											imagesArray
										);
									} else {
										// For backward compatibility, handle single media selection
										addThreadImage( media );
									}
								} }
								allowedTypes={ [ 'image' ] }
								multiple={ true }
								render={ ( { open } ) => (
									<Button
										icon={ image }
										variant="secondary"
										onClick={ ( e ) => {
											e.stopPropagation();
											open();
										} }
										onPointerDown={ ( event ) =>
											event.stopPropagation()
										}
									>
										{ __( 'Add Image', 'thread-block' ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					</div>
				</div>
				<Button
					className="remove-thread"
					variant="tertiary"
					icon={ close }
					{ ...attributes }
					{ ...listeners }
					onPointerDown={ ( event ) => event.stopPropagation() }
					onClick={ ( event ) => {
						event.stopPropagation();
						removeThread( index );
					} }
					isDestructive
				></Button>
			</div>
		</>
	);
}
