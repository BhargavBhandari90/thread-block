import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const {
		sections,
		threadLineColor,
		threadLineWidth,
		threadLineType,
		threadTitle,
		titleAlignment,
	} = attributes;

	return (
		<div className="thread-item" { ...useBlockProps.save() }>
			<RichText.Content
				tagName="h2"
				className="thread-title"
				style={ { textAlign: titleAlignment } }
				value={ threadTitle }
			/>
			{ sections.map( ( section, index ) => (
				<div key={ section.id } className="thread-section">
					<div className="thread-item-left">
						{ index !== sections.length - 1 && (
							<div
								className="thread-line"
								style={ {
									borderLeft: `${ threadLineWidth } ${ threadLineType } ${ threadLineColor }`,
								} }
							></div>
						) }
						{ section.imageUrl && (
							<img src={ section.imageUrl } alt="Thread" />
						) }
					</div>
					<div className="thread-item-right">
						<RichText.Content
							tagName="p"
							value={ section.content }
						/>
						<p></p>
					</div>
				</div>
			) ) }
		</div>
	);
}
