import CommandBase from 'elementor-api/modules/command-base';

export class Copy extends CommandBase {
	validateArgs( args ) {
		this.requireContainer( args );
	}

	apply( args ) {
		const { storageKey = 'clipboard', containers = [ args.container ] } = args;

		if ( ! elementor.selection.isSameType() ) {
			elementor.notifications.showToast( {
				message: __( 'That didn’t work. Try copying one kind of element at a time.', 'elementor' ),
				buttons: [
					{
						name: 'got_it',
						text: __( 'Got it', 'elementor' ),
					},
				],
			} );

			return false;
		}

		elementorCommon.storage.set(
			storageKey,
			containers.map( ( container ) => container.model.toJSON( { copyHtmlCache: true } ) )
		);
	}
}

export default Copy;
