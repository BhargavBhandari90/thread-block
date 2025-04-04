import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

export default function save( { attributes } ) {
	const {
		sections,
		threadLineColor,
		threadLineWidth,
		threadLineType,
		threadTitle,
		titleAlignment,
	} = attributes;

	console.log( sections );

	return (
		<div
			data-wp-interactive="buntywp/thread-item"
			data-wp-watch="callbacks.setupLightbox"
			className="thread-item"
			{ ...useBlockProps.save() }
		>
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
						{ section.threadImages &&
							section.threadImages.length > 0 && (
								<div className="thread-images-grid">
									{ section.threadImages.map(
										( imageItem, imageIndex ) => (
											<div
												key={ imageIndex }
												className="thread-image-item"
											>
												<div
													data-wp-context={ JSON.stringify(
														{
															imageId:
																imageItem.id,
															imageUrl:
																imageItem.url,
														}
													) }
													className="thread-image"
												>
													<img
														data-wp-on-async--click="actions.showLightbox"
														src={ imageItem.url }
														alt={ imageItem.alt }
													/>
													<button
														class="lightbox-trigger"
														type="button"
														aria-haspopup="dialog"
														aria-label={ __(
															'Enlarge'
														) }
														data-wp-on-async--click="actions.showLightbox"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="12"
															height="12"
															fill="none"
															viewBox="0 0 12 12"
														>
															<path
																fill="#fff"
																d="M2 0a2 2 0 0 0-2 2v2h1.5V2a.5.5 0 0 1 .5-.5h2V0H2Zm2 10.5H2a.5.5 0 0 1-.5-.5V8H0v2a2 2 0 0 0 2 2h2v-1.5ZM8 12v-1.5h2a.5.5 0 0 0 .5-.5V8H12v2a2 2 0 0 1-2 2H8Zm2-12a2 2 0 0 1 2 2v2h-1.5V2a.5.5 0 0 0-.5-.5H8V0h2Z"
															/>
														</svg>
													</button>
												</div>
											</div>
										)
									) }
								</div>
							) }
						<p></p>
					</div>
				</div>
			) ) }
			<div
				className="thread-images-grid single-image"
				data-wp-class--hide="!state.isPopupOpen"
			>
				<div className="thread-image-item full-width">
					<img data-wp-bind--src="state.imageSrc" />
					<button
						type="button"
						aria-label={ __( 'Press ESC to Cloese' ) }
						class="remove-popup-button"
						data-wp-on-async--click="actions.hideLightbox"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							width="20"
							height="20"
							aria-hidden="true"
							focusable="false"
						>
							<path d="m13.06 12 6.47-6.47-1.06-1.06L12 10.94 5.53 4.47 4.47 5.53 10.94 12l-6.47 6.47 1.06 1.06L12 13.06l6.47 6.47 1.06-1.06L13.06 12Z"></path>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}
