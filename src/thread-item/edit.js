import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';
import {
	Button,
	__experimentalBorderControl as BorderControl,
	PanelBody,
	ToolbarGroup,
	Tooltip,
	ToolbarButton,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import {
	DndContext,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	arrayMove,
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Icon, alignLeft } from '@wordpress/components';
import Threaditem from './component/threaditem';

import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const {
		sections,
		threadLineColor,
		threadLineWidth,
		threadLineType,
		threadTitle,
		titleAlignment,
	} = attributes;
	const blockProps = useBlockProps();
	const [ threadSections, setThreadSections ] = useState( sections );

	const addNewThread = () => {
		const newSection = { id: Date.now(), imageUrl: '', content: '' };
		const updatedSections = [ ...threadSections, newSection ];
		setThreadSections( updatedSections );
		setAttributes( { sections: updatedSections } );
	};

	const updateThread = ( index, key, value ) => {
		const updatedSections = threadSections.map( ( section, i ) =>
			i === index ? { ...section, [ key ]: value } : section
		);

		setThreadSections( updatedSections );
		setAttributes( { sections: updatedSections } );
	};

	const removeThread = ( index ) => {
		const newThreads = sections.filter( ( _, i ) => i !== index );
		setThreadSections( newThreads );
		setAttributes( { sections: newThreads } );
	};

	const onDragEnd = ( event ) => {
		const { active, over } = event;

		if ( over && active.id !== over.id ) {
			const oldIndex = sections.findIndex( ( t ) => t.id === active.id );
			const newIndex = sections.findIndex( ( t ) => t.id === over.id );
			const newThreads = arrayMove( sections, oldIndex, newIndex );
			setThreadSections( newThreads );
			setAttributes( { sections: newThreads } );
		}
	};

	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( {
			titleAlignment: newAlignment === undefined ? 'none' : newAlignment,
		} );
	};

	const sensors = useSensors( useSensor( PointerSensor ) );

	return (
		<>
			<div { ...blockProps } className="thread-item">
				<BlockControls>
					<ToolbarGroup>
						<Tooltip
							text={ __( 'Title Alignment', 'thread-block' ) }
						>
							<div>
								<AlignmentControl
									value={ titleAlignment }
									onChange={ onChangeAlignment }
								/>
							</div>
						</Tooltip>
					</ToolbarGroup>
				</BlockControls>
				<InspectorControls key="setting">
					<PanelBody
						title={ __(
							'Thread Settings',
							'block-development-examples'
						) }
					>
						<div>
							<label>
								{ __(
									'Thread Line',
									'block-development-examples'
								) }
							</label>
							<br />
							<br />
							<BorderControl
								value={ {
									color: threadLineColor || '#000000',
									width: threadLineWidth || '1px',
									style: threadLineType || 'solid',
								} }
								onChange={ ( newValue ) => {
									setAttributes( {
										threadLineColor: newValue.color,
										threadLineWidth: newValue.width,
										threadLineType: newValue.style,
									} );
								} }
								colors={ [
									{
										name: 'Blue 20',
										color: '#72aee6',
									},
									{
										name: 'Blue 40',
										color: '#3582c4',
									},
									{
										name: 'Red 40',
										color: '#e65054',
									},
									{
										name: 'Red 70',
										color: '#8a2424',
									},
									{
										name: 'Yellow 10',
										color: '#f2d675',
									},
									{
										name: 'Yellow 40',
										color: '#bd8600',
									},
								] }
								withSlider
							/>
						</div>
					</PanelBody>
				</InspectorControls>
				<RichText
					tagName="h2"
					className="thread-title"
					style={ { textAlign: titleAlignment } }
					value={ threadTitle }
					onChange={ ( newTitle ) =>
						setAttributes( { threadTitle: newTitle } )
					}
					placeholder={ __( 'Thread Title', 'thread-block' ) }
				/>
				<DndContext
					sensors={ sensors }
					collisionDetection={ closestCenter }
					onDragEnd={ onDragEnd }
				>
					<SortableContext
						items={ sections }
						strategy={ verticalListSortingStrategy }
					>
						{ threadSections.map( ( section, index ) => (
							<Threaditem
								key={ section.id }
								thread={ section }
								index={ index }
								updateThread={ updateThread }
								removeThread={ removeThread }
								threads={ sections }
								atts={ attributes }
							/>
						) ) }
					</SortableContext>
				</DndContext>
				<Button
					variant="tertiary"
					className="add-thread"
					onClick={ addNewThread }
					text={ __( 'Add another post' ) }
				></Button>
			</div>
		</>
	);
}
