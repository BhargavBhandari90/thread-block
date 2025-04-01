import { __ } from '@wordpress/i18n';
import {
	MediaUpload,
	MediaUploadCheck,
	RichText,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { media, close, dragHandle } from '@wordpress/icons';
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

	const style = {
		transform: CSS.Transform.toString( transform ),
		transition,
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
