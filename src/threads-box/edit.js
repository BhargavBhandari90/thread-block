import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	useInnerBlocksProps,
	BlockControls,
} from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import './editor.scss';

export default function Edit( { clientId } ) {
	const { insertBlocks } = useDispatch( 'core/block-editor' );

	const addExperience = () => {
		const newCards = Array.from( { length: 3 }, () =>
			wp.blocks.createBlock( 'buntywp/thread-item' )
		);

		insertBlocks( newCards, undefined, clientId );
	};

	const EXP_TEMPLATE = [ [ 'buntywp/thread-item' ] ];

	const innerBlocksProps = useInnerBlocksProps( {
		template: EXP_TEMPLATE,
	} );

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						icon="plus" // WordPress Plus Icon
						label={ __( 'Add Experience', 'experience-block' ) }
						onClick={ addExperience }
					/>
				</ToolbarGroup>
			</BlockControls>
			<div { ...useBlockProps() }>
				<div { ...innerBlocksProps } />
			</div>
		</>
	);
}
