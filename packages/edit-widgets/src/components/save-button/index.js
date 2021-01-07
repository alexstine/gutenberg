/**
 * WordPress dependencies
 */
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { STORE_NAME as editWidgetsStoreName } from '../../constants';

function SaveButton() {
	const { hasEditedWidgetAreaIds, isSaving } = useSelect( ( select ) => {
		const { getEditedWidgetAreas, isSavingWidgetAreas } = select(
			editWidgetsStoreName
		);

		return {
			hasEditedWidgetAreaIds: getEditedWidgetAreas()?.length > 0,
			isSaving: isSavingWidgetAreas(),
		};
	}, [] );
	const { saveEditedWidgetAreas } = useDispatch( editWidgetsStoreName );

	return (
		<Button
			isPrimary
			isBusy={ isSaving }
			aria-disabled={ isSaving }
			onClick={ isSaving ? undefined : saveEditedWidgetAreas }
			disabled={ ! hasEditedWidgetAreaIds }
		>
			{ isSaving ? __( 'Saving…' ) : __( 'Update' ) }
		</Button>
	);
}

export default SaveButton;
