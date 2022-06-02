import { UIKitIncomingInteractionContainerType } from '@rocket.chat/apps-engine/definition/uikit/UIKitIncomingInteractionContainer';
import { useMutableCallback } from '@rocket.chat/fuselage-hooks';
import { UiKitMessage, UiKitComponent, kitContext, messageParser } from '@rocket.chat/fuselage-ui-kit';
import { useSetModal, useUserRoom } from '@rocket.chat/ui-contexts';
import React from 'react';

import * as ActionManager from '../../../app/ui-message/client/ActionManager';
import { useBlockRendered } from '../../components/Message/hooks/useBlockRendered';
import { useJoinCall } from '../../contexts/VideoConfPopupContext';
import { renderMessageBody } from '../../lib/utils/renderMessageBody';
import JoinVideoConfModal from '../room/contextualBar/VideoConference/JoinVideoConfModal';
import './textParsers';

// TODO: move this to fuselage-ui-kit itself
const mrkdwn = ({ text } = {}) => text && <span dangerouslySetInnerHTML={{ __html: renderMessageBody({ msg: text }) }} />;

messageParser.mrkdwn = mrkdwn;
function MessageBlock({ mid: _mid, rid, blocks, appId }) {
	const { ref, className } = useBlockRendered();
	const setModal = useSetModal();
	const joinCall = useJoinCall();
	const room = useUserRoom(rid);

	const handleCloseModal = useMutableCallback(() => setModal());

	const context = {
		action: ({ actionId, value, blockId, mid = _mid, appId }) => {
			if (appId === 'videoconf-core' && actionId === 'join') {
				return setModal(
					<JoinVideoConfModal confTitle={value} onClose={handleCloseModal} room={room} onConfirm={() => joinCall(blockId)} />,
				);
			}

			ActionManager.triggerBlockAction({
				blockId,
				actionId,
				value,
				mid,
				rid,
				appId: blocks[0].appId,
				container: {
					type: UIKitIncomingInteractionContainerType.MESSAGE,
					id: mid,
				},
			});
		},
		appId,
		rid,
	};

	return (
		<kitContext.Provider value={context}>
			<div className={className} ref={ref} />
			<UiKitComponent render={UiKitMessage} blocks={blocks} />
		</kitContext.Provider>
	);
}

export default MessageBlock;